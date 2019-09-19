import Product from "../src/js/model/Product.js";

describe("Test product price by name", () => {
    
    it("should return 3 when name equals cola", () => {
        expect(Product.price("cola")).toBe(3);
    });

    it("should return 5 when name equals chips", () => {
        expect(Product.price("chips")).toBe(5);
    });

    it("should return 1 when name equals candy", () => {
        expect(Product.price("candy")).toBe(1);
    });
});

