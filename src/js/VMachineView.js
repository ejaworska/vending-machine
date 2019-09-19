export default class VMachineView {

    constructor(controller, machine, wallet) {
        this.controller = controller;
        this.element = this.createElement(machine, wallet);
        this.appendElementToDocument();
        this.registerEventListeners();
    }

    createElement(machine, wallet) {
        return document.createRange().createContextualFragment(this.render(machine, wallet)).firstChild;
    }

    appendElementToDocument() {
        document.getElementById("app").appendChild(this.element);
    }

    registerEventListeners() {
        this.registerBuyProduct();
        this.registerAddCoinToMachine();
        this.registerReplaceCoins();
    }

    registerBuyProduct() {
        const products = this.element.getElementsByClassName("product");
        Array.prototype.forEach.call(products, product => {
            product.addEventListener("click", ()=>{this.controller.buyProduct(product.id)});
        });

        // products.forEach(product => {
        //     product.addEventListener("click", ()=>{this.controller.buyProduct(product.id)});
        // })
    }

    registerAddCoinToMachine() {
        const coins = this.element.getElementsByClassName("coin");
        Array.prototype.forEach.call(coins, coin => {
            coin.addEventListener("click", ()=>{
                this.controller.addCoinToMachine(coin.id);
            });
        });
    }

    registerReplaceCoins() {
        document.getElementById("button").addEventListener("click", ()=>{
            const radioButtons = Array.prototype.filter.call(
                this.element.getElementsByTagName("input"), button => {
                return button.checked;
            });
            if(radioButtons.length > 0) {
                const id = radioButtons[0].id;
                this.controller.replaceCoinsAnimation(id);
            }
        });
    }

    update(machine,wallet) {
        this.element.innerHTML = this.render(machine,wallet);
        this.registerEventListeners(machine, wallet);
    }

    animateCoins(weight) {
        document.getElementById(weight).classList.add(`move${weight.split(",")[1]}`);
    }

    animateProduct(product) {
        document.getElementById(product).classList.add("bounce");
    }

    animateRaplaceCoins() {
        document.getElementById("flex-coins").classList.add("rotate");
    }

    render(machine, wallet) {
        return `<div class="fullscreen">
        <div id="left">
            <div id="radioContainer">
                <div>
                    <p>How much money do you have?</p>
                    <div id="checkbox">
                        ${this.mapCheckbox()}
                        <button id="button" type="button">get your coins</button>
                    </div>
                </div>
            </div>
            
            <ul id="flex-coins">
                ${this.mapCoins(wallet)}
                <li class="coin" id="0,50"><span class="tooltiptext">Are you sure you want to cheat?<br>You have: ${wallet.totalAmountOfMoney()} zł</span>
                    <img src="images/button-red.png" alt="fake coin"></li>
            </ul>
        </div>

        <div id="center">
            <img src="images/vending machine${machine.machinePictureCode()}.jpg" alt="Vending Machine">
        </div>

        <div id="right">
            <div id="claud">
                <img src="images/talkCloud1.png" alt="talk cloud">
                <div id="screen">${machine.screen}</div>
            </div>
            <div id="products">
                ${this.mapProducts(machine)}
            </div>
        </div>       
    </div>`.trim();
    }


    mapCheckbox() {
        const buttonsIds = ["10", "20", "30"];
        return Array.prototype.map.call(buttonsIds, id => {return `<label class="radioButton">${id} zł
            <input type="radio" name="radio" id=${id}>
            <span class="checkmark"></span>
        </label>`}).join("");
    }

    mapCoins(wallet) {
        const coins = [{weight: "2,51", value : "10", currency : "gr"},
            {weight: "3,22", value : "20", currency : "gr"},
            {weight: "3,94", value : "50", currency : "gr"},
            {weight: "5,00", value : "1", currency : "zł"},
            {weight: "5,21", value : "2", currency : "zł"},
            {weight: "6,54", value : "5", currency : "zł"}
        ];
        return Array.prototype.map.call(coins, coin => {
            return `<li class="coin" id=${coin.weight}>

            <span class="tooltiptext">${coin.value + " " + coin.currency} 
            <br>${wallet.coinsAmount(coin.weight)} available</span>

            <img src="images/${coin.value+coin.currency}${wallet.coinPictureCode(coin.weight)}.png" 
            alt="${coin.value + " " + coin.currency}"></li>`
        }).join("");
    }

    mapProducts(machine) {
        const products = ["cola", "chips", "candy"];
        return Array.prototype.map.call(products, product => {
            return `<div class="product" id=${product}>

            <span class="tooltiptext">${product} : ${machine.productPrice(product)} zł 
            <br>${machine.productAmount(product)} available</span>

            <img src="images/${product}${machine.productPictureCode(product)}.png" alt=${product}>
        </div>`
        }).join("");
    }
}