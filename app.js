let gridClean = document.getElementById("gridClean");

let shopItemsData = [   
    {
        id:'1',
        productName:"WASHCLEAN",
        shortDescription:"Silně alkalický, nepěnivý čistící a odmašťující přípravek",
        img: "img/canister.jpg",
        link: "washclean.html"
    },
    {
        id:'2',
        productName:"FLOOR WASH",
        shortDescription:"Silně alkalický, nepěnivý čistící a odmašťující přípravek",
        img: "img/canister.jpg",
        link: ""
    },  
    {
        id:'3',
        productName:"GASTRO CLEAN",
        shortDescription:"Silně alkalický, nepěnivý čistící a odmašťující přípravek",
        img: "img/canister.jpg",
        link: ""
    },
    {
        id:'4',
        productName:"UNIPROF",
        shortDescription:"Koncentrovaný čistící přípravek na okna, voděodolné povrchy, sanitární zařízení",
        img: "img/canister.jpg",
        link: ""
    },
    {
        id:'5',
        productName:"RAMBO WC",
        shortDescription:"Přípravek (koncentrát) na odstranění rzi a vodního kamene",
        img: "img/canister.jpg",
        link: ""
    },
    {
        id:'6',
        productName:"RAMBO milk",
        shortDescription:"Vysoce účinný prostředek k mytí silně znečištěných rukou zejména od šmíru, oleje, ale i dalšího znečištění",
        img: "img/canister.jpg",
        link: ""
    },
    {
        id:'7',
        productName:"RAMBO sand",
        shortDescription:"Vysoce účinný přípravek pro čištění silně znečištěných povrchů různých materiálů",
        img: "img/canister.jpg",
        link: ""
    },
    {
        id:'8',
        productName:"REGIA",
        shortDescription:"Antibakteriální tekuté mýdlo na ruce",
        img: "img/canister.jpg",
        link: ""
    },
    {
        id:'9',
        productName:"LUXSOAP",
        shortDescription:"Tekuté mýdlo",
        img: "img/canister.jpg",
        link: ""
    },
    {
        id:'10',
        productName:"SPRING",
        shortDescription:"Mycí přípravek pro ruční mytí nádobí s vůní limetky",
        img: "img/canister.jpg",
        link: ""
    },
    {
        id:'11',
        productName:"RUDON",
        shortDescription:"Silně alkalický pěnivý čistící přípravek",
        img: "img/canister.jpg",
        link: ""
    },
    {
        id:'12',
        productName:"SOFT FLOOR",
        shortDescription:"Alkalický pěnivý čistící přípravek",
        img: "img/canister.jpg",
        link: ""
    },
    {
        id:'13',
        productName:"NIOSEPTOR",
        shortDescription:"Odpuzovač vody, ochranná leštěnka nerezu",
        img: "img/canister.jpg",
        link: ""
    }]

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

