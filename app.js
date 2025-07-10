let cleanCell = document.getElementById("productGridClean");

let shopItemsData = [   
    {
        id:'1',
        name:"WASHCLEAN",
        shortDescription:"Silně alkalický, nepěnivý čistící a odmašťující přípravek",
        img: "img/canister.jpg"
    },
    {
        id:'2',
        name:"FLOOR WASH",
        shortDescription:"Silně alkalický, nepěnivý čistící a odmašťující přípravek",
        img: "img/canister.jpg" 
    },  
    {
        id:'3',
        name:"GASTRO CLEAN",
        shortDescription:"Silně alkalický, nepěnivý čistící a odmašťující přípravek",
        img: "img/canister.jpg" 
    },
    {
        id:'4',
        name:"UNIPROF",
        shortDescription:"Koncentrovaný čistící přípravek na okna, voděodolné povrchy, sanitární zařízení",
        img: "img/canister.jpg" 
    },
    {
        id:'5',
        name:"RAMBO WC",
        shortDescription:"Přípravek (koncentrát) na odstranění rzi a vodního kamene",
        img: "img/canister.jpg" 
    },
    {
        id:'6',
        name:"RAMBO milk",
        shortDescription:"Vysoce účinný prostředek k mytí silně znečištěných rukou zejména od šmíru, oleje, ale i dalšího znečištění",
        img: "img/canister.jpg" 
    },
    {
        id:'7',
        name:"RAMBO sand",
        shortDescription:"Vysoce účinný přípravek pro čištění silně znečištěných povrchů různých materiálů",
        img: "img/canister.jpg" 
    },
    {
        id:'8',
        name:"REGIA",
        shortDescription:"Antibakteriální tekuté mýdlo na ruce",
        img: "img/canister.jpg" 
    },
    {
        id:'9',
        name:"LUXSOAP",
        shortDescription:"Tekuté mýdlo",
        img: "img/canister.jpg" 
    },
    {
        id:'10',
        name:"SPRING",
        shortDescription:"Mycí přípravek pro ruční mytí nádobí s vůní limetky",
        img: "img/canister.jpg" 
    },
    {
        id:'11',
        name:"RUDON",
        shortDescription:"Silně alkalický pěnivý čistící přípravek",
        img: "img/canister.jpg" 
    },
    {
        id:'12',
        name:"SOFT FLOOR",
        shortDescription:"Alkalický pěnivý čistící přípravek",
        img: "img/canister.jpg" 
    },
    {
        id:'13',
        name:"NIOSEPTOR",
        shortDescription:"Odpuzovač vody, ochranná leštěnka nerezu",
        img: "img/canister.jpg" 
    }]

let generateCleanCell = () => {
    return (cleanCell.innerHTML = shopItemsData.map((x)=>{
        return `
        <div class="product-cell" id="productCellClean">
          <div class="product-cell-left">
            <h2>${x.name}</h2>
            <p>${x.shortDescription}</p>
          </div>
          <div class="product-cell-right">
              <img src="${x.img}">
          </div>
        </div>
    `;
    }).join(""));
};
generateCleanCell();

