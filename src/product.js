let product = document.getElementById("target");

// Function to fetch data by id
let generateProduct = (id) => {
  const item = shopItemsData.find((product) => product.id === id); // Find item by id

  if (!item) {
    console.error("Product not found");
    return;
  }

  // Check if the product is already in the basket
  const isInBasket = basket.find((x) => x.id === id);

  product.innerHTML = `
     <div class="product" id="product">
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
            <div class="buy-button ${isInBasket ? "red-button" : "green-button"}" id="buy-button-${id}" onclick="toggleBasket(${id})">
              <p>${isInBasket ? "Odebrat z košíku" : "Přidat do košíku"}</p>
            </div>
        </div>
      </div>
      </div>
  <div class="usage" id="usage">
  <div class="usage-container">
        <div class="usage-text">
          <div class="usage-content">
            <div class="usage-content-text">
              <p class="usage-content-text-title">Návod k použití</p>
              <p>
                Generální úklid a odmaštění: smíchejte s vodou v poměru 1:1 – 1:20 (5 dl na 10 l vody).
                <br>
                Běžný úklid: smíchejte s vodou v poměru 1:100 (1dl na 10 l vody).
              </p>
            </div>
            <div class="documents">
              <div class="pdf">
                <img src="img/pdf.png">
                <p>Technický list</p>
              </div> 
            </div>
          </div>
        </div>
        <div class="usage-text">
          <div class="usage-content">
            <div class="usage-content-text">
              <p class="usage-content-text-title">Fyzikální a chemické vlastnosti</p>
              <p>
              Světležlutá  kapalina,  pH 11,0-13,5 (3% roztok při 20 °C). Zápach: slabý, charakteristický.
              </p>
            </div>
            <div class="documents">
              <div class="pdf">
                <img src="img/pdf.png">
                <p>Bezpečnostní list</p>
              </div> 
            </div>
         </div>
    `;
};

// Function to toggle item in basket
let toggleBasket = (id) => {
  const button = document.getElementById(`buy-button-${id}`);
  const search = basket.find((x) => x.id === id);

  if (search === undefined) {
    // Add item to basket
    basket.push({ id: id, item: 1 });
    button.innerHTML = `<p>Odebrat z košíku</p>`;
    button.classList.add("red-button");
    console.log("Added to basket:", basket);
  } else {
    // Remove item from basket
    basket = basket.filter((x) => x.id !== id);
    button.innerHTML = `<p>Přidat do košíku</p>`;
    button.classList.remove("red-button");
    console.log("Removed from basket:", basket);
  }

  // Save basket to local storage
  localStorage.setItem("basket", JSON.stringify(basket));

  calculation(); // Update cartAmount after modifying basket
};


// Get the id from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"), 10);

// Call the function with the id from the URL
generateProduct(productId);

let update = (id) => {
  let search = basket.find((x) => x.id === id);

  if (!search) {
    console.log(`Item with id ${id} not found in basket.`);
    return; // Exit the function if the item is not found
  }

  console.log(`Quantity of item with id ${id}:`, search.item);
  calculation();
};

/*
let increment = (id)=>{

  let search = basket.find((x)=> x.id === id);

    if (search === undefined) {
      basket.push({
      id: id,
      item: 1,
    });
    }
    else{
      search.item += 1;
    };
  

  console.log(basket);


  };
*/

