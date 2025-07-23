// Import or include all product data arrays
const shopItemsData = [...cleanData, ...desinfectionData, ...combData, ...careData, ...specData];


document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("products-grid-cart");
  
    if (!cartContainer) {
      console.error("Cart container not found in the DOM.");
      return;
    }
  
    updateCartList(); // Call your function to update the cart list
  });

  const formatPrice = (priceInCents) => {
    const price = priceInCents / 100; // Convert cents to decimal
    return new Intl.NumberFormat("cs-CZ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price) + " Kč";
  };

  let fetchBasketData = () => {
    if (!basket || basket.length === 0) {
      console.log("Basket is empty.");
      return []; // Return an empty array if the basket is empty
    }
  
    const basketData = basket.map((basketItem) => {
      const product = shopItemsData.find((item) => item.id === basketItem.id);
  
      if (!product) {
        console.warn(`Product with id ${basketItem.id} not found in shopItemsData.`);
        return null; // Handle missing product gracefully
      }
  
      return {
        ...product,
        quantity: basketItem.item,
        totalPrice: product.pricePerUnit * basketItem.item, // Total price in cents
      };
    });
  
    return basketData.filter((item) => item !== null); // Filter out null values
  };

  document.addEventListener("DOMContentLoaded", () => {
    const basketData = fetchBasketData();
    console.log("Basket Data:", basketData);
  
    if (basketData.length > 0) {
      updateCartList(basketData); // Pass the fetched data to updateCartList
    }
  });

  let updateCartList = (basketData) => {
    const cartContainer = document.getElementById("products-grid-cart");
    cartContainer.innerHTML = "";
  
    if (!basketData || basketData.length === 0) {
      cartContainer.innerHTML = "<p>Košík je prázdný.</p>";
      return;
    }
  
    let list = document.createElement("div");
  
    let totalPriceWithoutVAT = 0;
    let totalPriceWithVAT = 0;
  
    basketData.forEach((product) => {
      let listItem = document.createElement("div");
      listItem.innerHTML = `
        <div class="cart-item">
          <div class="cart-item-details">
            <img src="${product.img}" alt="${product.productName}" class="cart-item-img">
            <p class="cart-item-name" onclick="openProductPage(${product.id})">${product.productName}</p>
            <div class="cart-item-counter">
              <button class="decrement" onclick="decrement(${product.id})">-</button>
              <span class="counter">${product.quantity}</span>
              <button class="increment" onclick="increment(${product.id})">+</button>
            </div>
            <p class="cart-item-total">Cena (bez DPH): ${formatPrice(product.totalPrice)}</p>
          </div>
        </div>
      `;
      list.appendChild(listItem);
  
      // Accumulate totals
      totalPriceWithoutVAT += product.totalPrice; // Total price without VAT
      totalPriceWithVAT += product.totalPrice * 1.21; // Assuming 21% VAT
    });
  
    cartContainer.appendChild(list);
  
    // Add a div for the total prices
    const totalsDiv = document.createElement("div");
    totalsDiv.className = "cart-totals";
    totalsDiv.innerHTML = `
      <div class="totals">
        <p class="total-without-vat">Celková cena (bez DPH): ${formatPrice(totalPriceWithoutVAT)}</p>
        <p class="total-with-vat">Celková cena (s DPH, 21 %): ${formatPrice(totalPriceWithVAT)}</p>
        <button class="clear-cart-button" onclick="clearCart()">Vyprázdnit košík</button>
        <button class="open-order-form-button" onclick="openOrderForm()">Otevřít objednávkový formulář</button>
      </div>
    `;
    cartContainer.appendChild(totalsDiv);
  };

  let clearCart = () => {
    basket = []; // Clear the basket
    localStorage.setItem("basket", JSON.stringify(basket)); // Save the empty basket to localStorage
    updateCartList(fetchBasketData()); // Refresh the cart list
    calculation(); // Update the basket counter
  };

  let increment = (id) => {
    const search = basket.find((x) => x.id === id);
  
    if (search) {
      search.item += 1; // Increment the quantity
      localStorage.setItem("basket", JSON.stringify(basket)); // Save to localStorage
      updateCartList(fetchBasketData()); // Refresh the cart list
    }
    calculation();
  };
  
  let decrement = (id) => {
    const search = basket.find((x) => x.id === id);
  
    if (search && search.item > 1) {
      search.item -= 1; // Decrement the quantity
      localStorage.setItem("basket", JSON.stringify(basket)); // Save to localStorage
      updateCartList(fetchBasketData()); // Refresh the cart list
    } else if (search && search.item === 1) {
      basket = basket.filter((x) => x.id !== id); // Remove item from basket
      localStorage.setItem("basket", JSON.stringify(basket)); // Save to localStorage
      updateCartList(fetchBasketData()); // Refresh the cart list
    }
    calculation();
  };
  console.log(calculation);

  let openOrderForm = () => {
    const cartContainer = document.getElementById("products-grid-cart");
    const existingForm = document.getElementById("order-form");
  
    // Prevent multiple forms from being added
    if (existingForm) {
      alert("Objednávkový formulář je již otevřen."); // "The order form is already open."
      return;
    }
  
    const orderForm = document.createElement("form");
    orderForm.id = "order-form";
    orderForm.innerHTML = `
      <h3>Objednávkový formulář</h3>
      <input type="text" name="name" placeholder="Jméno" required />
      <input type="text" name="surname" placeholder="Příjmení" required />
      <input type="text" name="companyName" placeholder="Název společnosti" />
      <input type="text" name="icNumber" placeholder="IČ" />
      <input type="text" name="dicNumber" placeholder="DIČ" />
      <input type="email" name="email" placeholder="Email" required />
      <input type="text" name="phone" placeholder="Telefon" required />
      <textarea name="deliveryAddress" placeholder="Dodací adresa" required></textarea>
      <textarea name="orderDetails" readonly>${generateOrderDetails(fetchBasketData())}</textarea>
      <button type="button" onclick="submitOrder()">Odeslat objednávku</button>
    `;
    cartContainer.appendChild(orderForm);
  };

  let generateOrderDetails = (basketData) => {
    return basketData
      .map(
        (product) =>
          `${product.productName} - Množství: ${product.quantity}, Cena za kus: ${formatPrice(
            product.pricePerUnit
          )}, Celkem: ${formatPrice(product.totalPrice)}`
      )
      .join("\n");
  };

  let submitOrder = async () => {
    const form = document.getElementById("order-form");
    const formData = new FormData(form);
  
    try {
      const response = await fetch("send_order.php", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        alert("Děkujeme za vaši objednávku!"); // "Thank you for your order!"
        // Show a thank-you message
        const thankYouMessage = document.createElement("div");
        thankYouMessage.className = "thank-you-message";
        thankYouMessage.innerHTML = `
          <h2>Děkujeme za vaši objednávku!</h2>
          <p>Budete přesměrováni na hlavní stránku</p>
        `;
        document.body.appendChild(thankYouMessage);
  
        // Clear the basket and local storage
        basket = [];
        localStorage.setItem("basket", JSON.stringify(basket));
  
        // Redirect to the main page after 5 seconds
        setTimeout(() => {
          window.location.href = "index.html"; // Replace with your main page URL
        }, 5000);
      } else {
        alert("Došlo k chybě při odesílání objednávky."); // "An error occurred while sending the order."
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Došlo k chybě při odesílání objednávky."); // "An error occurred while sending the order."
    }
  };