// Import or include all product data arrays
const shopItemsData = [...cleanData, ...desinfectionData, ...combData, ...careData, ...specData];

document.addEventListener("DOMContentLoaded", () => {
  // First, render the cart items based on the basket
  const basketData = fetchBasketData();
  updateCartList(basketData);

  // Then, check if the order form should be reopened
  const isOrderFormOpen = localStorage.getItem("orderFormOpen");

  // Only reopen the form if it was open before AND the basket is not empty
  if (isOrderFormOpen === "true" && basket.length > 0) {
    openOrderForm();
  } else {
    // Otherwise, ensure the flag is cleared if the basket is empty
    localStorage.removeItem("orderFormOpen");
  }
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

  let updateCartList = (basketData) => {
    const cartContainer = document.getElementById("products-grid-cart");
    cartContainer.innerHTML = "";
  
    if (!basketData || basketData.length === 0) {
      cartContainer.innerHTML = `
      <div class="empty-cart">
        <p>Košík je prázdný</p>
        <img src="img/empty_cart.png">
      
      `; // "The cart is empty."
      return;
    }
  
    let list = document.createElement("div");
    list.classList.add("cart-item-container");
  
    let totalPriceWithoutVAT = 0;
    let totalPriceWithVAT = 0;
  
    basketData.forEach((product) => {
      let listItem = document.createElement("div");
      listItem.id = `cart-item-${product.id}`; // Add a unique ID for each cart item
      listItem.innerHTML = `
        <div class="cart-item">
          <div class="cart-item-details">
            <img src="${product.img}" alt="${product.productName}" class="cart-item-img">
            <p class="cart-item-name" style="background-color: ${product.categoryColor};" onclick="openProductPage(${product.id})">${product.productName}</p>
            <div class="cart-item-counter">
              <button class="decrement" onclick="decrement(${product.id})">-</button>
              <span class="counter">${product.quantity}</span>
              <button class="increment" onclick="increment(${product.id})">+</button>
            </div>
            <p class="cart-item-units">${product.amount * product.quantity} ${product.unit}</p>
            <p class="cart-item-total">${formatPrice(product.totalPrice)} (bez DPH)</p>
          </div>
        </div>
      `;
      list.appendChild(listItem);
  
      // Accumulate totals
      totalPriceWithoutVAT += product.totalPrice; // Total price without VAT
      totalPriceWithVAT += product.totalPrice * 1.21; // Assuming 21% VAT
    });
  
    cartContainer.appendChild(list);
  
    // Update totals only on cart.html
    if (window.location.pathname.includes("cart.html")) {
      const totalsDiv = document.createElement("div");
      totalsDiv.className = "cart-totals";
      totalsDiv.innerHTML = `
        <div class="totals">
        <div class="sums">
          <p class="total-without-vat">Celková cena (bez DPH): ${formatPrice(totalPriceWithoutVAT)}</p>
          <p class="total-with-vat">Celková cena (s DPH, 21 %): ${formatPrice(totalPriceWithVAT)}</p>
        </div>
        <div class="cart-totals-buttons">
          <button class="clear-cart-button" onclick="clearCart()">Vyprázdnit košík</button>
          <button class="open-order-form-button" onclick="openOrderForm()">Objednat</button>
        </div>
          </div>
      `;
      cartContainer.appendChild(totalsDiv);
    }
  };

  let clearCart = () => {
    closeOrderForm(); // Close the form and clear its state from localStorage
    basket = []; // Clear the basket
    localStorage.setItem("basket", JSON.stringify(basket)); // Save the empty basket to localStorage
    updateCartList(fetchBasketData()); // Refresh the cart list to show it's empty
    calculation(); // Update the basket counter
  };

  let increment = (id) => {
    const search = basket.find((x) => x.id === id);
  
    if (search) {
      search.item += 1; // Increment the quantity
    } else {
      basket.push({ id: id, item: 1 }); // Add the product to the basket if it doesn't exist
    }
  
    localStorage.setItem("basket", JSON.stringify(basket)); // Save the updated basket to localStorage
  
    // Update the specific cart item in the DOM
    const cartItem = document.getElementById(`cart-item-${id}`);
    if (cartItem) {
      const product = shopItemsData.find((x) => x.id === id);
      cartItem.querySelector(".counter").textContent = search.item; // Update the quantity
      cartItem.querySelector(".cart-item-units").textContent = `${product.amount * search.item} ${product.unit}`; // Update the total units
      cartItem.querySelector(".cart-item-total").textContent = `${formatPrice(product.pricePerUnit * search.item)} (bez DPH)`; // Update the total price
    }
  
    if (window.location.pathname.includes("cart.html")) {
      updateTotals(); // Update totals dynamically only on cart.html
    }
  
    calculation(); // Update the small cart counter
    updateOrderForm(); // Update only the order details
  };

  let decrement = (id) => {
    const search = basket.find((x) => x.id === id);
  
    if (!search) {
      console.warn(`Product with id ${id} not found in the basket.`);
      return;
    }
  
    const cartItem = document.getElementById(`cart-item-${id}`);
  
    if (search.item === 1) {
      basket = basket.filter((x) => x.id !== id);
      if (cartItem) {
        cartItem.remove();
      }
    } else {
      search.item -= 1;
      if (cartItem) {
        const product = shopItemsData.find((x) => x.id === id);
        cartItem.querySelector(".counter").textContent = search.item;
        cartItem.querySelector(".cart-item-units").textContent = `${product.amount * search.item} ${product.unit}`;
        cartItem.querySelector(".cart-item-total").textContent = `${formatPrice(product.pricePerUnit * search.item)} (bez DPH)`;
      }
    }
  
    if (window.location.pathname.includes("cart.html")) {
      updateTotals();
    }
  
    if (basket.length === 0) {
      clearCart();
    }
  
    calculation();
    localStorage.setItem("basket", JSON.stringify(basket));
    updateOrderForm(); // Update only the order details
  };

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
  orderForm.className = "order-form";
  orderForm.innerHTML = `
    <h3>Údaje zákazníka</h3>
      <div class="input-fields">
        <input type="text" name="name" placeholder="Jméno" required />
        <input type="text" name="surname" placeholder="Příjmení" required />
        <input type="text" name="companyName" placeholder="Název společnosti" />
        <input type="text" name="icNumber" placeholder="IČ" />
        <input type="text" name="dicNumber" placeholder="DIČ" />
        <input type="email" name="email" placeholder="Email" required />
        <input type="text" name="phone" placeholder="Telefon" required />
        <textarea name="deliveryAddress" placeholder="Dodací adresa" required></textarea>
        <textarea class="order-text-area-details" name="orderDetails" readonly>${generateOrderDetails(fetchBasketData())}</textarea>
      </div>
    <button type="button" onclick="submitOrder()">Odeslat objednávku</button>
  `;
  cartContainer.appendChild(orderForm);

  // Restore saved form data from localStorage
  const savedData = JSON.parse(localStorage.getItem("orderFormData"));
  if (savedData) {
    Object.keys(savedData).forEach(key => {
      const field = orderForm.querySelector(`[name="${key}"]`);
      // --- Defensive check: DO NOT restore the orderDetails field ---
      if (field && key !== "orderDetails") {
        field.value = savedData[key];
      }
    });
  }

   // Add event listener to save form data on input
   orderForm.addEventListener("input", () => {
    const formData = new FormData(orderForm);
    const data = Object.fromEntries(formData.entries());
    // --- FIX: Do not save the generated order details ---
    delete data.orderDetails; 
    localStorage.setItem("orderFormData", JSON.stringify(data));
  });

  // Save the state of the order form in localStorage
  localStorage.setItem("orderFormOpen", "true");
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
        closeOrderForm(); // Close the form and clear its state
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

  let updateTotals = () => {
    const basketData = fetchBasketData();
  
    const totalPriceWithoutVAT = basketData.reduce((sum, product) => sum + product.totalPrice, 0);
    const totalPriceWithVAT = totalPriceWithoutVAT * 1.21; // Assuming 21% VAT
  
    // Update total prices in the DOM
    const totalWithoutVATElement = document.querySelector(".total-without-vat");
    if (totalWithoutVATElement) {
      totalWithoutVATElement.textContent = `Celková cena (bez DPH): ${formatPrice(totalPriceWithoutVAT)}`;
    }
  
    const totalWithVATElement = document.querySelector(".total-with-vat");
    if (totalWithVATElement) {
      totalWithVATElement.textContent = `Celková cena (s DPH, 21 %): ${formatPrice(totalPriceWithVAT)}`;
    }
  };

  let updateOrderForm = () => {
    const orderForm = document.getElementById("order-form");
    // Only proceed if the order form is actually on the page
    if (!orderForm) {
      return;
    }
  
    const orderDetailsTextarea = orderForm.querySelector("textarea[name='orderDetails']");
    
    if (orderDetailsTextarea) {
      const newDetails = generateOrderDetails(fetchBasketData());
      // Use .value to set the content of a form element
      orderDetailsTextarea.value = newDetails; 
    }
  };

  let closeOrderForm = () => {
    const form = document.getElementById("order-form");
    if (form) {
      form.remove(); // Remove the order form from the DOM
      console.log("Order form has been closed.");
    }
  
    // Clear the state of the order form in localStorage
    localStorage.removeItem("orderFormOpen");
    localStorage.removeItem("orderFormData"); // Also clear the saved form data
  };