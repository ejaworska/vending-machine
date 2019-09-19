import CoinsManager from "./CoinsManager.js";
import Coin from "./Coin.js"

export default class Wallet extends CoinsManager {

    constructor() {
        super();
        this.addDefaultCoins();
    }

    coinPictureCode(weight) {
        return this.coinIsAvailable(weight) ? "1" : "0";
    }

    replaceCoins(amount) {
        this.coins.clear();
        this.addAmountOfMoney(amount);
        this.add(new Coin("0,50"));
    }

    addDefaultCoins() {
        for(let i = 0; i < 13; i++) {
            this.add(new Coin("2,51"));  
        }
        this.add(new Coin("3,22"));
        this.add(new Coin("3,94"));
        this.add(new Coin("5,00"));
        this.add(new Coin("5,21"));
        this.add(new Coin("6,54"));
        this.add(new Coin("0,50"));
    }
}