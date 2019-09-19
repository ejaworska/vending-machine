import CoinsManager from "./CoinsManager.js";
import Coin from "./Coin.js";
import Product from "./Product.js";

export default class Machine extends CoinsManager {
    constructor() {
        super();
        this.weights = ["6,54", "5,21", "5,00", "3,94", "3,22", "2,51"];
        this.products = new Map();
        this.addDefaultProducts();
        this.addDefaultCoins();
        this.transactionValue = 0;
        this.screen = `INSERT COINS
                        <br> total in machine: ${this.totalAmountOfMoney()}`;
        this.transactionCoins = new Map();
        this.total = this.totalAmountOfMoney();
    }

    addDefaultProducts() {
        for(let i = 0; i < 4; i++) {
            this.addProduct(new Product("chips"));
            this.addProduct(new Product("candy"));
            this.addProduct(new Product("cola"));
        }
        this.addProduct(new Product("candy"));
    }

    addProduct(product) {
        if(this.products.has(product.name)) {
            this.products.get(product.name).push(product);
        } else {
            this.products.set(product.name, [product]);
        }        
    }

    addDefaultCoins() {
        this.add(new Coin("2,51"));
    }

    removeProduct(productName) {
        if(this.products.has(productName)) {
            return this.products.get(productName).pop();
        }
    }

    addCoin(coin) {
        CoinsManager.addCoinToCollection(coin, this.transactionCoins);
        const value = Coin.getCoinValue(coin.weight);
        if( value > 0) {          
            this.transactionValue = Number((this.transactionValue + value).toFixed(1));
            this.updateDisplayCoinsValue();
        } else {
            const coinsToReturn = new Map(this.transactionCoins);
            this.setUpUpdateDisplayNoCheating();
            this.transactionCoins.clear();
            this.transactionValue = 0;
            return coinsToReturn;
        }
    }

    productAmount(productName) {
        if(this.products.has(productName)) {
            return this.products.get(productName).length;
        }
        return 0;
    }

    machinePictureCode() {
        return `${this.productPictureCode("cola")}${this.productPictureCode("chips")}${this.productPictureCode("candy")}`;
    }

    productPictureCode(productName) {
        return this.productIsAvailable(productName) ? "1" : "0";
    }

    productPrice(productName) {
        if(this.productIsAvailable(productName)) {
            return Product.price(productName);
        }
        return ""; 
    }

    buyProduct(productName) {
        if(this.productIsAvailable(productName) && this.productCanBePaid(productName)) {
            const changeValue = Number((this.transactionValue - Product.price(productName)).toFixed(1));
            if(changeValue > 0) {
                return this.getChange(changeValue, productName);//returns some change
            } else {
                this.processTransaction(productName);
                this.updateDisplayThankYou();
                //returns undefined if no change
            }
        } else {
            return false;//returns false when transaction cannot be processed
        }   
    }

    processTransaction(productName) {
        this.removeProduct(productName);
        this.addTransactionCoins();
        this.transactionValue = 0;
    }

    productIsAvailable(productName) {
        if(this.products.has(productName)) {
            return this.products.get(productName).length > 0;
        }
        return false;
    }

    productCanBePaid(productName) {
        if(this.products.has(productName)) {
            return Product.price(productName) <= this.transactionValue;
        }
        return false;
    }

    getChange(changeValue, productName) {
        let change = [];
        let transactionCoinsChange = [];

        for(let weight of this.weights) {

            while(changeValue > 0 && changeValue >= Coin.getCoinValue(weight)
                && (CoinsManager.isCoinAvailable(weight, this.coins)
                || CoinsManager.isCoinAvailable(weight, this.transactionCoins))){
    
                if(CoinsManager.isCoinAvailable(weight, this.coins)) {
                    let coin = this.coins.get(weight).pop();
                    change.push(coin);
                } else {
                    let coin = this.transactionCoins.get(weight).pop();
                    transactionCoinsChange.push(coin);
                }
                changeValue = Number((changeValue - Coin.getCoinValue(weight)).toFixed(1));                
            }

            if(changeValue === 0) {
                break;
            }
        }

        if(changeValue !== 0) {
            return this.cancelTransaction(change, transactionCoinsChange);
        } 
        change = this.joinChange(change, transactionCoinsChange);
        this.acceptTransaction(productName);
        return change;
    }

    cancelTransaction(change, transactionCoinsChange) {
        this.returnChangeToCoins(change);
        this.returnChangeToTransactionCoins(transactionCoinsChange);
        change = this.getTransactionCoins();
        this.transactionValue = 0;
        this.updateDisplayNoChange();
        return change;
    }

    returnChangeToCoins(change) {
        if(change.length > 0) {
            this.addCoins(change);
        } 
    }

    returnChangeToTransactionCoins(change) {
        if(change.length > 0) {
            for(let coin of change) {
                CoinsManager.addCoinToCollection(coin, this.transactionCoins);
            }
        }
    }

    joinChange(change, transactionCoinsChange) {
        while(transactionCoinsChange.length > 0) {
            change.push(transactionCoinsChange.pop());
        }
        return change;
    }

    acceptTransaction(productName) {     
        this.processTransaction(productName);
        this.updateDisplayTakeChange();
    }

    addTransactionCoins() {
        this.transactionCoins.forEach(coins => {
            while(coins.length > 0) {
                this.add(coins.pop());
            }
        });

    }

    getTransactionCoins() {
        const result = [];
        this.transactionCoins.forEach(coins => {
            while(coins.length > 0) {
                result.push(coins.pop());
            }
        });
        return result;
    }

    setUpUpdateDisplayNoCheating() {
        if(this.transactionValue > 0) {
            this.updateDisplayNoCheatingTakeMoney();
        } else {
            this.updateDisplayNoCheating();
        }
    }

    updateDisplayNoCheatingTakeMoney(){
        this.screen = `No cheating please! Take your money back!`;
    }
    
    updateDisplayNoCheating(){
        this.screen = `No cheating please!`;
    }

    updateDisplayInstertCoins() {
        this.screen = `INSERT COINS <br> total in machine: ${this.moneyTotalAmount()}`;
    }

    updateDisplayThankYou() {
        this.screen = `Thank you! Have a nice day!`;
    }

    updateDisplayTakeChange() {
        this.screen = `Take the change! Thank you!`;
    }

    updateDisplayNoChange() {
        this.screen = `I'm sorry but I can't make a change. Prepare the exact amount!`;
      
    }

    updateDisplayCoinsValue() {
        if(this.isInt(this.transactionValue)) {
            this.screen = this.transactionValue;
        } else {
            this.screen = this.transactionValue.toFixed(2);
        }
    }  
    
    isInt(n) {
        return n % 1 === 0;
    }
}