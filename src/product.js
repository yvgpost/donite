console.log(shopItemsData);


let product = document.getElementById("product");

// Function to fetch data by id
let generateProduct = (id) => {
  const item = shopItemsData.find((product) => product.id === id); // Find item by id

  if (!item) {
    console.error("Product not found");
    return;
  }
  product.innerHTML = `
     <ul class="product-breadcrumb">
        <li class="previous" onclick="window.open('store.html','_top' ); return false;">Čisticí prostředky</li>
        <li>${item.productName}</li>
      </ul>
      <div class="product-container">
        <img src="${item.img}">
        <div class="product-container-content">
            <p class="product-name">${item.productName}</p>
            <div class="product-description">
              <p class="product-description-title">Popis výrobku</p>
              <p class="product-description-text">${item.longDescription}</p>
            </div>
              <div class="prices">
              <div class="price-per-unit">
                <p class="price-per-unit-text">Cena za kg</p>
                <div class="price-per-unit-numbers">
                  <p class="vat">${item.preicePerKg} Kč</p>
                  <p class="no-vat">${item.pricePerKgVat} Kč z DPH</p>
                </div>
              </div>
              <div class="price-per-unit">
                <p class="price-per-unit-text">Cena balení</p>
                <div class="price-per-unit-numbers">
                  <p class="vat">${item.pricePerUnit} Kč</p>
                  <p class="no-vat">${item.pricePerUnitVat} Kč z DPH</p>
                </div>
              </div>
            </div>
            <div class="buy-button">
              <img src="img/delivery.png">
              <p>Požádat o nákup</p>
            </div>
        </div>
      </div>
    `;
};

// Get the id from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"), 10);

// Call the function with the id from the URL
generateProduct(productId);