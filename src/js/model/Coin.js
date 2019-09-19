export default class Coin {
    constructor(weight) {
        this.weight = weight;
    }

    static getCoinValue(weight) {
        if(weight === "2,51") {
            return 0.1;
        } else if (weight === "3,22") {
            return 0.2;
        } else if (weight === "3,94") {
            return 0.5;
        } else if (weight === "5,00") {
            return 1;
        } else if (weight === "5,21") {
            return 2;
        } else if (weight === "6,54") {
            return 5;
        } else {
            return 0;
        }
    }
}
