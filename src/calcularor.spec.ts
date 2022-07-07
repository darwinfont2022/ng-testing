import { Calculator } from "./calculator";

describe("Calculator", () => {
    let calculator: Calculator;
    
    beforeEach(() => {
        calculator = new Calculator();
    }
    );
    describe("multiply", () => {
        it("should be able to multiply two numbers", () => {
            const result = calculator.multiply(2, 3);
            expect(result).toBe(6);
        }
        );
    });
    
    describe("divide", () => {
        it("should be able to divide two numbers", () => {
            const result = calculator.divide(2, 3);
            expect(result).toBe(0.6666666666666666);
        }
        );
        it("should be able to divide two numbers", () => {
            const result = calculator.divide(2, 0);
            expect(result).toBe(0);
        }
        );
    });
});