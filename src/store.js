let gridClean = document.getElementById("gridClean");

let generateCleanCell = () => {
    return (gridClean.innerHTML = shopItemsData.map((x)=>{
        let = {id, productName, shortDescription, img, link} = x;
        return `
            <div id="product-id-${id}" onclick="window.open('${link}','_top' ); return false;">
                <div class="product-cell" id="productCellClean">
                    <div class="product-cell-left">
                        <h2>${productName}</h2>
                        <p>${shortDescription}</p>
                    </div>
                    <div class="product-cell-right">
                        <img src="${img}">
                    </div>
                </div>
            </div>
    `;
    }).join(""));
};

generateCleanCell();