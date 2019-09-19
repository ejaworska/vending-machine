export default class Product {
    constructor(name) {
        this.name = name;
    }

    static price(name) {
        if(name === "cola") {
            return 3;
        } else if(name === "chips") {
            return 5;
        } else if(name === "candy") {
            return 1;
        }
    }
}