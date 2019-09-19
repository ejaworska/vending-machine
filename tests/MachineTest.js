import Machine from "../src/js/model/Machine.js";
import Product from "../src/js/model/Product.js";
import Coin from "../src/js/model/Coin.js";
import CoinsManager from "../src/js/model/CoinsManager.js";

describe("Adding default products to machine after initializing the constructor", () => {
    let machine;

    beforeEach(() => {
        machine = new Machine();
    });

    it("should return 3 when checking the size of the machine products default collection", () => {
        expect(machine.products.size).toBe(3);
    });
});

describe("Adding product to machine", () => {
    let machine;

    beforeEach(() => {
        machine = new Machine();
    });

    it("should return 6 when checking amount of candies", () => {
        machine.addProduct(new Product("candy"))
        expect(machine.productAmount("candy")).toBe(6);
    });
});

describe("Adding default coins to machine after initializing the constructor", () => {
    let machine;

    beforeEach(() => {
        machine = new Machine();
    });

    it("should return 1 when checking the size of default collection of money", () => {
        expect(machine.coins.size).toBe(1);
    });

    it("should return 0.1 when checking the default total amount of money", () => {
        expect(machine.totalAmountOfMoney()).toBe(0.1);
    });
});

describe("Removing product from machine", () => {
    let machine;

    beforeEach(() => {
        machine = new Machine();
        machine.addProduct(new Product("p"));
    });

    it("should return 4 when checking the size of products", () => {
        machine.removeProduct("p");
        expect(machine.products.size).toBe(4);
    });

    it("should return 0 when checking the size of product list", () => {
        machine.removeProduct("p");
        expect(machine.products.get("p").length).toBe(0);
    });
});

describe("Adding coin to machine", () => {
    jasmine.getEnv().allowRespy(true);
    let machine;

    beforeEach(() => {
        machine = new Machine();
        spyOn(CoinsManager, "addCoinToCollection");
        spyOn(machine, "updateDisplayCoinsValue");
    });

    function createCoinsCollection() {
        const coins = new Map();
        coins.set("2,51",[new Coin("2,51")]);
        coins.set("",[new Coin("")]);
        return coins;
    }

    function spyOnDisplayNoCheatingAndCoinValue() {
        spyOn(machine, "setUpUpdateDisplayNoCheating");
        spyOn(Coin, "getCoinValue").and.returnValue(0); 
    }

    it("should return 1 transaction value after adding coin of value 1", () => {
        spyOn(Coin, "getCoinValue").and.returnValue(1);    
        machine.addCoin(new Coin(""));
        expect(machine.transactionValue).toBe(1);     
    });

    it("should return 0 transaction value after adding coin of value 0", () => {
        spyOnDisplayNoCheatingAndCoinValue();
        machine.addCoin(new Coin(""));
        expect(machine.transactionValue).toBe(0);     
    });

    it("should return transaction coins after adding coin of value 0", () => {
        spyOn(machine, "setUpUpdateDisplayNoCheating");
        spyOn(CoinsManager, "addCoinToCollection").and.callThrough();
        const coinsToReturn = createCoinsCollection();
        machine.addCoin(new Coin("2,51"));
        spyOn(Coin, "getCoinValue").and.returnValue(0); 
        expect(machine.addCoin(new Coin(""))).toEqual(coinsToReturn);     
    });

    it("should update display transaction coin value", () => {
        spyOn(Coin, "getCoinValue").and.returnValue(1); 
        spyOn(machine, "updateDisplayCoinsValue").and.callThrough();   
        machine.addCoin(new Coin(""));
        expect(machine.screen).toBe(1);     
    });

    it("should return undefined after adding positive value of coin", () => {
        spyOn(Coin, "getCoinValue").and.returnValue(1);    
        expect(machine.addCoin(new Coin(""))).toBeUndefined();     
    });

    it("should return coins after adding coin of value 0", () => {
        spyOnDisplayNoCheatingAndCoinValue(); 
        const coin = new Coin("");
        machine.transactionCoins.set("", [coin]);
        const coins = new Map(machine.transactionCoins);
        expect(machine.addCoin(coin)).toEqual(coins);
    });

    it(`should remove coins from transaction coins 
        and set transaction value to 0 after adding coin of value 0`, () => {
            
        spyOnDisplayNoCheatingAndCoinValue(); 
        const coin = new Coin("");
        machine.transactionCoins.set("", [coin]);
        machine.addCoin(coin);
        expect(machine.transactionCoins.size).toBe(0);
        expect(machine.transactionValue).toBe(0);     
    });

    it("should update display no cheating", () => {
        spyOn(Coin, "getCoinValue").and.returnValue(0);    
        machine.addCoin(new Coin(""));
        expect(machine.screen).toEqual("No cheating please!");     
    });


    it("should update display no cheating take money", () => {
        spyOn(Coin, "getCoinValue").and.returnValue(1); 
        const coin = new Coin("");
        machine.addCoin(coin);
        spyOn(Coin, "getCoinValue").and.returnValue(0); 
        machine.addCoin(coin);
        expect(machine.screen).toEqual("No cheating please! Take your money back!");     
    });

});


describe("Getting amount of product by name", () => {
    let machine;

    beforeEach(() => {
        machine = new Machine();
    });

    it("should return 4 when getting amount of cola", () => {
        expect(machine.productAmount("cola")).toBe(4);
    });

    it("should return 1 when getting amount of fake product", () => {
        machine.addProduct(new Product("f"));
        expect(machine.productAmount("f")).toBe(1);
    });

    it("should return 0 when getting amount of not existing product", () => {
        expect(machine.productAmount("n")).toBe(0);
    });
});

describe("Getting machine picture code", () => {
    let machine;

    beforeEach(() => {
        machine = new Machine();
    });

    function remove(product) {
        const products = machine.products.get(product);
        while(products.length > 0) {
            products.pop();
        }
    }

    it(`should return "111" when getting default picture code`, () => {
        expect(machine.machinePictureCode()).toBe("111");
    });

    it(`should return "000" when removing all products`, () => {
        remove("cola");
        remove("chips");
        remove("candy");
        expect(machine.machinePictureCode()).toBe("000");
    });

    it(`should return "011" when removing cola`, () => {
        remove("cola");
        expect(machine.machinePictureCode()).toBe("011");
    });

    it(`should return "001" when removing cola and chips`, () => {
        remove("cola");
        remove("chips");
        expect(machine.machinePictureCode()).toBe("001");
    });

    it(`should return "101" when removing chips`, () => {
        remove("chips");
        expect(machine.machinePictureCode()).toBe("101");
    });

    it(`should return "110" when removing candy`, () => {
        remove("candy");
        expect(machine.machinePictureCode()).toBe("110");
    });

    it(`should return "010" when removing cola and candy`, () => {
        remove("cola");
        remove("candy");
        expect(machine.machinePictureCode()).toBe("010");
    });

    it(`should return "100" when removing chips and candy`, () => {
        remove("chips");
        remove("candy");
        expect(machine.machinePictureCode()).toBe("100");
    }); 
});


describe("Getting product price", () => {
    let machine;

    beforeEach(() => {
        machine = new Machine();
    });

    it(`should return 1 when getting candy price`, () => {
        expect(machine.productPrice("candy")).toBe(1);
    });

    it(`should return 5 when getting chips price`, () => {
        expect(machine.productPrice("chips")).toBe(5);
    });

    it(`should return 3 when getting cola price`, () => {
        expect(machine.productPrice("cola")).toBe(3);
    });
});








