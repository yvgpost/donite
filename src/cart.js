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

  let fetchBasketData = () => {
    if (!basket || basket.length === 0) {
      console.log("Basket is empty.");
      return [];
    }
  
    // Fetch product data based on IDs in the basket
    const basketData = basket.map((basketItem) => {
      const product = shopItemsData.find((item) => item.id === basketItem.id);
  
      if (!product) {
        console.warn(`Product with id ${basketItem.id} not found in shopItemsData.`);
        return null; // Handle missing product gracefully
      }
  
      return {
        ...product,
        quantity: basketItem.item, // Add quantity from the basket
        totalPrice: (parseFloat(product.pricePerUnitVat.replace(",", ".")) * basketItem.item).toFixed(2), // Calculate total price
      };
    });
  
    // Filter out any null values (in case of missing products)
    return basketData.filter((item) => item !== null);
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
    cartContainer.innerHTML = ""; // Clear existing content
  
    if (basketData.length === 0) {
      cartContainer.innerHTML = "<p>Košík je prázdný.</p>"; // Display message if basket is empty
      return;
    }
  
    let list = document.createElement("ol"); // Create an ordered list
  
    basketData.forEach((product) => {
      let listItem = document.createElement("li");
      listItem.innerHTML = `
        <div class="cart-item">
          <img src="${product.img}" alt="${product.productName}" class="cart-item-img">
          <div class="cart-item-details">
            <p class="cart-item-name">${product.productName}</p>
            <p class="cart-item-price">Cena za kus (s DPH): ${product.pricePerUnitVat} Kč</p>
            <div class="cart-item-counter">
              <button class="decrement" onclick="decrement(${product.id})">-</button>
              <span class="counter">${product.quantity}</span>
              <button class="increment" onclick="increment(${product.id})">+</button>
            </div>
            <p class="cart-item-total">Celková cena (s DPH): ${product.totalPrice} Kč</p>
          </div>
        </div>
      `;
      list.appendChild(listItem);
    });
  
    cartContainer.appendChild(list);
  };

console.log(document.getElementById("products-grid-cart"));
console.log("CareData:", careData);
