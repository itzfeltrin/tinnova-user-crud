import { getClassName, formatCpf, formatPhone } from "./index"

describe('Helper functions', () => {
    describe('getClassName', () => {
        it('Works properly', () => {
            const className = getClassName({
                valid: true,
                outlined: true,
                filled: false,
            });

            expect(className).toBe("valid outlined");
        });
    });

    describe('formatCpf', () => {
        it('Returns the correct format', () => {
            const formatted = formatCpf("11100033322");

            expect(formatted).toBe("111.000.333-22");
        }); 
    });

    describe('formatPhone', () => {
        it('Returns the correct format with DDD and 8 numbers', () => {
            const formatted = formatPhone("5499991111");

            expect(formatted).toBe("+55 (54) 9999-1111");
        }); 
        
        it('Returns the correct format with DDI, DDD and 9 numbers', () => {
            const formatted = formatPhone("5554999991111");

            expect(formatted).toBe("+55 (54) 99999-1111");
        }); 
    });
})