let product = document.getElementById("product");

let generateProduct = () => {
    return (product.innerHTML = `
           <ul class="product-breadcrumb">
        <li class="previous" onclick="window.open('store.html','_top' ); return false;">Čisticí prostředky</li>
        <li>WASH CLEAN 6 kg</li>
      </ul>
      <div class="product-container">
        <img src="img/canister.jpg">
        <div class="product-container-content">
            <p class="product-name">WASH CLEAN 6 kg</p>
            <div class="product-description">
              <p class="product-description-title">Popis výrobku</p>
              <p class="product-description-text">Silně alkalický, nepěnivý čistící a odmašťující přípravek. Používá se na vodovzdorné povrchy, podlahy a technologická zařízení v potravinářství, stravovacích provozech, bazénech, kotelnách k vnitřnímu čištění potrubí a nádrží, apod.</p>
            </div>
              <div class="prices">
              <div class="price-per-unit">
                <p class="price-per-unit-text">Cena za kg</p>
                <div class="price-per-unit-numbers">
                  <p class="vat">199 Kč</p>
                  <p class="no-vat">240,70 Kč z DPH</p>
                </div>
              </div>
              <div class="price-per-unit">
                <p class="price-per-unit-text">Cena balení</p>
                <div class="price-per-unit-numbers">
                  <p class="vat">1 194 Kč</p>
                  <p class="no-vat">1 444,74 Kč z DPH</p>
                </div>
              </div>
            </div>
            <div class="buy-button">
              <img src="img/delivery.png">
              <p>Požádat o nákup</p>
            </div>
        </div>
      </div>
    `);
};

generateProduct();

let usage = document.getElementById("usage");

let generateUsage = () => {
    return (usage.innerHTML = `
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
      </div>
    </div>
    `);
};

generateUsage()