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
    return (priceInCents / 100).toFixed(2).replace(".", ",") + " Kč";
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
        totalPrice: product.pricePerUnitVat * basketItem.item, // Total price in cents
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
            <p class="cart-item-total">Cena (s DPH): ${formatPrice(product.totalPrice)}</p>
          </div>
        </div>
      `;
      list.appendChild(listItem);
    });
  
    cartContainer.appendChild(list);
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
  