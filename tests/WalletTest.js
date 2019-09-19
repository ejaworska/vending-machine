import Wallet from "../src/js/model/Wallet.js";
import Coin from "../src/js/model/Coin.js";

describe("Adding default coins to wallet after initializing the constructor", () => {
    let wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it("should return 7 when getting the size of coins map", () => {
        expect(wallet.coins.size).toBe(7);
    });

    it("should return 10 when getting the total amount of coins", () => {
        expect(wallet.totalAmountOfMoney()).toBe(10);
    });
});

describe("Getting picture code", () => {
    let wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it(`should return "1" when getting product picture code for existing weights`, () => {
        expect(wallet.coinPictureCode("2,51")).toBe("1");
        expect(wallet.coinPictureCode("3,22")).toBe("1");
        expect(wallet.coinPictureCode("3,94")).toBe("1");
        expect(wallet.coinPictureCode("5,00")).toBe("1");
        expect(wallet.coinPictureCode("5,21")).toBe("1");
        expect(wallet.coinPictureCode("6,54")).toBe("1");
        expect(wallet.coinPictureCode("0,50")).toBe("1");
    });

    it(`should return "0" when getting product picture code for not existing weights`, () => {
        expect(wallet.coinPictureCode("1,51")).toBe("0");
        expect(wallet.coinPictureCode("-8,22")).toBe("0");
        expect(wallet.coinPictureCode("0")).toBe("0");
        expect(wallet.coinPictureCode("12")).toBe("0");
        expect(wallet.coinPictureCode("521")).toBe("0");
        expect(wallet.coinPictureCode("654")).toBe("0");
        expect(wallet.coinPictureCode("0,5")).toBe("0");
    });

    it(`should return "0" when getting product picture code for not available coins`, () => {
        wallet.removeCoins("2,51");
        expect(wallet.coinPictureCode("2,51")).toBe("0");
    });
});

describe("Replacing coins in wallet", () => {
    let wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it("should return 10 when replacing coins for the amount of 10", () => {
        wallet.replaceCoins("10");
        expect(wallet.totalAmountOfMoney()).toBe(10);
    });

    it("should return 20 when replacing coins for the amount of 20", () => {
        wallet.replaceCoins("20");
        expect(wallet.totalAmountOfMoney()).toBe(20);
    });

    it("should return 30 when replacing coins for the amount of 30", () => {
        wallet.replaceCoins("30");
        expect(wallet.totalAmountOfMoney()).toBe(30);
    });
});

describe("Adding new coin to wallet", () => {
    let wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it("should return total amount 15 after adding coin of 6,54 weight", () => {
        wallet.add(new Coin("6,54"));
        expect(wallet.totalAmountOfMoney()).toBe(15);
    });

    it("should return total amount 10 and size 8, after adding coin of 1,54 weight", () => {
        const coin = new Coin("1,54");
        wallet.add(coin);
        expect(wallet.totalAmountOfMoney()).toBe(10);
        expect(wallet.coins.size).toBe(8);
    });
});

describe("Getting coin from wallet", () => {
    let wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it("should return coin waight 6,54 and wallet total amount 5 after getting coin of 6,54 weight", () => {
        const coin = wallet.getCoin("6,54");
        expect(coin.weight).toBe("6,54");
        expect(wallet.totalAmountOfMoney()).toBe(5);
    });

    it("should return wallet total amount 10 after getting not existing coin", () => {
        wallet.getCoin("0");
        expect(wallet.totalAmountOfMoney()).toBe(10);
    });
});

describe("Checcking if wallet has coin", () => {
    let wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it("should returns true when checking if has existing coins", () => {
        expect(wallet.hasCoin("2,51")).toBeTruthy();
        expect(wallet.hasCoin("3,22")).toBeTruthy();
        expect(wallet.hasCoin("3,94")).toBeTruthy();
        expect(wallet.hasCoin("5,00")).toBeTruthy();
        expect(wallet.hasCoin("5,21")).toBeTruthy();
        expect(wallet.hasCoin("6,54")).toBeTruthy();
        expect(wallet.hasCoin("0,50")).toBeTruthy();
    });

    it("should returns false when checking if has not existing coin", () => {
        expect(wallet.hasCoin("1,51")).toBeFalsy();
    });
});

describe("Addding amount of coins", () => {
    let wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it("should return 50 when getting the total amount of coins after adding amount of 40", () => {
        wallet.addAmountOfMoney(40);
        expect(wallet.totalAmountOfMoney()).toBe(50);
    });

    it("should return 50 when getting the total amount of coins after adding amount of 10", () => {
        wallet.addAmountOfMoney(10);
        expect(wallet.totalAmountOfMoney()).toBe(20);
    });
});

describe("Getting amount of coins by weight", () => {
    let wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it("should return 13 when getting the amount of coins of 2,51 weight", () => {
        expect(wallet.coinsAmount("2,51")).toBe(13);
    });

    it("should return 1 when getting the amount of coins of 5,00 weight", () => {
        expect(wallet.coinsAmount("5,00")).toBe(1);
    });

    it("should return 0 when getting the amount of coins of 3 weight", () => {
        expect(wallet.coinsAmount("3")).toBe(0);
    });

    it("should return 0 when getting the amount of coins of 2,51 weight after removing the coins", () => {
        wallet.removeCoins("2,51");
        expect(wallet.coinsAmount("2,51")).toBe(0);
    });

    it("should return 2 when getting the amount of coins of 5,21 weight after adding coin of 5,21 weight", () => {
        wallet.add(new Coin("5,21"));
        expect(wallet.coinsAmount("5,21")).toBe(2);
    });
});


describe("Getting total amount of coins", () => {
    let wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it("should return 10 when getting total amount of coins after initializing constructor", () => {
        expect(wallet.totalAmountOfMoney()).toBe(10);
    });

    it("should return 11 when getting total amount of coins after adding coin of 5,00 weight ", () => {
        wallet.add(new Coin("5,00"));
        expect(wallet.totalAmountOfMoney()).toBe(11);
    });
});

describe("Checking if coin is available", () => {
    let wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it("should return true when checking if is available existing coin", () => {
        expect(wallet.coinIsAvailable("2,51")).toBeTruthy();
        expect(wallet.coinIsAvailable("3,22")).toBeTruthy();
        expect(wallet.coinIsAvailable("3,94")).toBeTruthy();
        expect(wallet.coinIsAvailable("5,00")).toBeTruthy();
        expect(wallet.coinIsAvailable("5,21")).toBeTruthy();
        expect(wallet.coinIsAvailable("6,54")).toBeTruthy();
        expect(wallet.coinIsAvailable("0,50")).toBeTruthy();
    });

    it("should return false when checking if is available not existing coin", () => {
        expect(wallet.coinIsAvailable("1")).toBeFalsy();
    });

    it("should return false when checking if is available coin after removing coins of 6,54 weight", () => {
        wallet.removeCoins("6,54");
        expect(wallet.coinIsAvailable("6,54")).toBeFalsy();
    });
});

describe("Adding coins to wallet", () => {
    let wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it("should return total amount 12 after adding coins", () => {
        const coins = [new Coin("5,00"), new Coin("5,00")];
        wallet.addCoins(coins)
        expect(wallet.totalAmountOfMoney()).toBe(12);
    });
});







