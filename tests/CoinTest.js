import Coin from "../src/js/model/Coin.js";

describe("Test coin value by weight", () => {

    it("should return 0.1 value when weight equals 2,51", () => {
        expect(Coin.getCoinValue("2,51")).toBe(0.1);
    });

    it("should return 0.2 value when weight equals 3,22", () => {
        expect(Coin.getCoinValue("3,22")).toBe(0.2);
    });

    it("should return 0.5 value when weight equals 3,94", () => {
        expect(Coin.getCoinValue("3,94")).toBe(0.5);
    });

    it("should return 1 value when weight equals 5,00", () => {
        expect(Coin.getCoinValue("5,00")).toBe(1);
    });

    it("should return 2 value when weight equals 5,21", () => {
        expect(Coin.getCoinValue("5,21")).toBe(2);
    });

    it("should return 5 value when weight equals 6,54", () => {
        expect(Coin.getCoinValue("6,54")).toBe(5);
    });
});

