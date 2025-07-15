let generateStoreProducts = () => {
    const container = document.getElementById("products-grid"); // Ensure this ID matches your HTML
    container.innerHTML = ""; // Clear existing content
  
    shopItemsData.forEach((item) => {
      const isInBasket = basket.find((x) => x.id === item.id); // Check if item is in the basket
  
      const productDiv = document.createElement("div");
      productDiv.className = "product-cell";
      productDiv.innerHTML = `
      <div class="product-all" id="product-id-${item.id}" onclick="openProductPage(${item.id})">
                        <div class="product-cell-left">
                            <h2>${item.productName}</h2>
                            <p>${item.shortDescription}</p>
                        </div>
                        <div class="product-cell-right">
                            <img src="${item.img}" >
                            ${isInBasket ? `<svg class="small-cart" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"/>
                            </svg>` : ""}
                        </div>
      </div>
      `;
  
      container.appendChild(productDiv);
    });
  };
  document.addEventListener("DOMContentLoaded", () => {
    generateStoreProducts(); // Generate product divs on page load
  });

  /* 
  <div id="product-id-1" onclick="openProductPage(1)">
                <div class="product-cell" id="productCellClean">
                    <div class="product-cell-left">
                        <h2>WASHCLEAN 6 kg</h2>
                        <p>Silně alkalický, nepěnivý čistící a odmašťující přípravek</p>
                    </div>
                    <div class="product-cell-right">
                        <img src="/img/canister.jpg">
                    </div>
                </div>
            </div>

    */