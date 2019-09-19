import VMachineView from "./VMachineView.js";
import CoinsManager from "./model/CoinsManager.js";

export default class VMachineController {

    constructor(machine, wallet) {
        this.machine = machine;
        this.wallet = wallet;
        this.view = new VMachineView(this, this.machine, this.wallet);
    }

    buyProduct(productName) {
        const change = this.machine.buyProduct(productName);
        if(change !== false) {//transaction failed
            if(change !== undefined) {//there is some change
                this.wallet.addCoins(change);
            }
            this.view.update(this.machine, this.wallet);
            if(this.machine.screen !== "I'm sorry but I can't make a change. Prepare the exact amount!") {
                this.view.animateProduct(productName);
            }
            this.updateWithDefaultScreen3000();
        }   
    }

    updateWithDefaultScreen3000() {
        setTimeout(() => { this.updateWithDefaultScreen();}, 3000);
    }
    
    doubleUpdate() {
        this.updateWithDefaultScreen3000();
        this.view.update(this.machine, this.wallet);    
    }
    
    updateWithDefaultScreen() {
        if(this.machine.transactionValue === 0) {
            this.machine.screen = `INSERT COINS <br> total in machine: ${this.machine.totalAmountOfMoney()}`;
            this.view.update(this.machine, this.wallet);
        }
    }

    addCoinToMachine(weight) {
        if(this.wallet.hasCoin(weight)) {
            const coin = this.wallet.getCoin(weight);
            const moneyBack = this.machine.addCoin(coin);
            if(moneyBack !== undefined) {//there was cheating
                CoinsManager.moveCoins(moneyBack, this.wallet.coins);
                this.doubleUpdateWithAnimation(weight);
            } else {
                this.updateWithAnimation(weight);
            }
        }
    }

    doubleUpdateWithAnimation(weight) {
        this.view.animateCoins(weight);
        setTimeout(() => { this.view.update(this.machine, this.wallet);}, 800);    
        setTimeout(() => { this.updateWithDefaultScreen();}, 3000);
    }

    updateWithAnimation(weight) {
        this.view.animateCoins(weight);
        setTimeout(() => { this.view.update(this.machine, this.wallet);}, 800);
    }

    getCoin(weight) {
        this.wallet.getCoin(weight);
    }

    addCoinsToWallet(amount) {
        this.wallet.addAmountOfMoney(amount);
        this.view.update(this.machine, this.wallet);
    }

    replaceCoinsAnimation(id) {
        this.view.animateRaplaceCoins();
        this.replaceCoins300(id);
    }

    replaceCoins300(id) {
        setTimeout(() => { this.replaceCoins(id);}, 500);
    }

    replaceCoins(amount) {      
        this.wallet.replaceCoins(amount);
        this.view.update(this.machine, this.wallet);
    }
}