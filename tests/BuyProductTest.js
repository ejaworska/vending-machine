import Machine from "../src/js/model/Machine.js";
import Coin from "../src/js/model/Coin.js";

function coinsMapIsEmpty(map) {
    map.forEach(coins => {
        if(coins.size > 0) {
            return false;
        }
    });
    return true;
}

describe("Buying a product when transaction cannot be processed", () => {
    let machine;

    beforeEach(() => {
        machine = new Machine();
    });

    it("should return false when product is not available", () => {
        expect(machine.buyProduct("p")).toBeFalsy();
    });

    it("should return false when product can't be paid", () => {
        machine.transactionValue = 0;
        expect(machine.buyProduct("chips")).toBeFalsy();
    });

    
});

describe("Buying a product when there is no change", () => {
    let machine;

    beforeEach(() => {
        machine = new Machine();
    });

    function buyProductNoChange() {
        machine.transactionValue = 5;
        machine.transactionCoins = new Map();
        machine.transactionCoins.set("6,54", [new Coin("6,54")]);
        machine.buyProduct("chips");
    }

    it("should return undefined", () => {
        machine.transactionValue = 5;
        expect(machine.buyProduct("chips")).toBeUndefined();
    });
    
    it("should remove product", () => {
        machine.transactionValue = 5;
        machine.buyProduct("chips");
        expect(machine.productAmount("chips")).toBe(3);
    });
    
    it("should add transaction coins to machine", () => {
        buyProductNoChange();
        expect(machine.totalAmountOfMoney()).toBe(5.1);
    });
    
    it("should clear transaction value", () => {
        buyProductNoChange();
        expect(machine.transactionValue).toBe(0);
    });
    
    it("should clear transaction coins", () => {
        buyProductNoChange();
        expect(coinsMapIsEmpty(machine.transactionCoins)).toBeTruthy();
    });
    
    it("should set screen to thank you", () => {
        buyProductNoChange();
        expect(machine.screen).toEqual("Thank you! Have a nice day!");
    });
    
        
});

describe("Buying a product when there is a change", () => {
    let machine;

    beforeEach(() => {
        machine = new Machine();
    });

    function setUpTransactionChangeFromMachine() {
        machine.transactionValue = 5.1;
        machine.transactionCoins = new Map();
        machine.transactionCoins.set("6,54", [new Coin("6,54")]);
        machine.transactionCoins.set("2,51", [new Coin("2,51")]);
    }

    function setUpTransactionChangeFromTransactionCoins() {
        machine.transactionValue = 5.20;
        machine.transactionCoins = new Map();
        machine.transactionCoins.set("6,54", [new Coin("6,54")]);
        machine.transactionCoins.set("3,22", [new Coin("3,22")]);
    }

    it("should clear transaction value", () => {
        setUpTransactionChangeFromMachine();
        machine.buyProduct("chips");
        expect(machine.transactionValue).toBe(0);
    });
    
    it("should clear transaction coins", () => {
        setUpTransactionChangeFromMachine();
        machine.buyProduct("chips");
        expect(coinsMapIsEmpty(machine.transactionCoins)).toBeTruthy();
    });

    it("should remove product", () => {
        setUpTransactionChangeFromMachine();
        machine.buyProduct("chips");
        expect(machine.productAmount("chips")).toBe(3);
    });

    it("should add transaction coins to machine", () => {
        setUpTransactionChangeFromMachine();
        machine.buyProduct("chips");
        expect(machine.totalAmountOfMoney()).toBe(5.1);
    });

    it("should return change from machine coins", () => {
        setUpTransactionChangeFromMachine();
        expect(machine.buyProduct("chips")).toEqual([new Coin("2,51")]);
        expect(machine.totalAmountOfMoney()).toBe(5.1);
    });

    it("should return change from transaction coins", () => {
        setUpTransactionChangeFromTransactionCoins();
        expect(machine.buyProduct("chips")).toEqual([new Coin("3,22")]);
        expect(machine.totalAmountOfMoney()).toBe(5.1);
    });

    it("should set screen to take the change", () => {
        setUpTransactionChangeFromMachine();
        machine.buyProduct("chips");
        expect(machine.screen).toEqual("Take the change! Thank you!");
    });    
});

describe("Buying a product when there is a change and no coins to return", () => {
    let machine;

    beforeEach(() => {
        machine = new Machine();
    });

    function setUpTransactionNoCoinsToChange() {
        machine.transactionValue = 2;
        machine.transactionCoins = new Map();
        machine.transactionCoins.set("5,21", [new Coin("5,21")]);
    }

    it("should clear transaction value", () => {
        setUpTransactionNoCoinsToChange();
        machine.buyProduct("candy");
        expect(machine.transactionValue).toBe(0);
    });
    
    it("should clear transaction coins", () => {
        setUpTransactionNoCoinsToChange();
        machine.buyProduct("candy");
        expect(coinsMapIsEmpty(machine.transactionCoins)).toBeTruthy();
    });

    it("should not remove product", () => {
        setUpTransactionNoCoinsToChange();
        machine.buyProduct("candy");
        expect(machine.productAmount("candy")).toBe(5);
    });

    it("should not add transaction coins to machine", () => {
        setUpTransactionNoCoinsToChange();
        machine.buyProduct("candy");
        expect(machine.totalAmountOfMoney()).toBe(0.1);
    });

    it("should return transaction coins", () => {
        setUpTransactionNoCoinsToChange();
        expect(machine.buyProduct("candy")).toEqual([new Coin("5,21")]);
    });

    it("should set screen to can't make a change", () => {
        setUpTransactionNoCoinsToChange();
        machine.buyProduct("candy");
        expect(machine.screen).toEqual(`I'm sorry but I can't make a change. Prepare the exact amount!`);
    });    
});



