import CoinsManager from "../src/js/model/CoinsManager.js";
import Coin from "../src/js/model/Coin.js";

describe("Adding coin to collection", () => {

    let coins;

    beforeEach(() => {
        coins = new Map();
        const coin1 = new Coin("1");
        coins.set("1", [coin1]);
    });
    
    it("should return size 2 when getting the size of collection after adding coin of different weight", () => {
        const coin2 = new Coin("2");
        CoinsManager.addCoinToCollection(coin2, coins);
        expect(coins.size).toBe(2);
    });

    it("should return size 1 when getting the size of collection after adding coin of the same weight", () => {
        const coin2 = new Coin("1");
        CoinsManager.addCoinToCollection(coin2, coins);
        expect(coins.size).toBe(1);
    });
});

describe("Checking if is avalilable coin of weight", () => {

    let coins;

    beforeEach(() => {
        coins = new Map();
    });
    
    it("should return true when checking if is available coin of 1 weight", () => {
        coins.set("1", [new Coin("1")]);
        expect(CoinsManager.isCoinAvailable("1", coins)).toBeTruthy();
    });

    it("should return false when checking if is available coin of 1 weight", () => {
        coins.set("1", []);
        expect(CoinsManager.isCoinAvailable("1", coins)).toBeFalsy();
    });

    it("should return false when checking if is available coin of 1 weight", () => {
        expect(CoinsManager.isCoinAvailable("1", coins)).toBeFalsy();
    });
});

describe("Moving coins", () => {

    let coins1;
    let coins2;

    beforeEach(() => {
        coins1 = new Map();
        coins1.set("1", [new Coin("1")]);
        coins1.set("2", [new Coin("2")]);
        coins2 = new Map();
        coins2.set("2", [new Coin("2")]);
        coins2.set("3", new Coin("3"));
    });
    
    it("should return size 3 of coins2 after moving coins1 to coin2", () => {
        CoinsManager.moveCoins(coins1, coins2);
        expect(coins2.size).toBe(3);
    });

    it("should return size 0 of coins1 after moving coins1 to coin2", () => {
        CoinsManager.moveCoins(coins1, coins2);
        expect(coins1.size).toBe(0);
    });
});


