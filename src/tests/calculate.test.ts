/**
 * Тести для функції `calculate`, яка керує станом калькулятора.
 *
 * @module calculate.test
 *
 * @remarks
 * Модуль перевіряє обробку натискань кнопок:
 * - цифри
 * - десяткової точки
 * - операторів
 * - кнопки "="
 * - кнопки "C" (скидання)
 *
 * @import {CalcState, calculate} from "../logic" — логіка роботи калькулятора.
 */
import { CalcState, calculate } from "../logic";

describe('calculate', () => {

    /** Початковий порожній стан калькулятора. */
    const emptyState: CalcState = { total: null, next: null, operation: null };

    /**
     * Перевіряє, що натискання цифри оновлює поле `total`,
     * якщо калькулятор знаходиться у початковому стані.
     */
    test('натискання цифри оновлює total', () => {
        expect(calculate(emptyState, '5')).toEqual({
            total: '5',
            next: null,
            operation: null
        });
    });

    /**
     * Перевіряє додавання десяткової точки до поточного значення `total`.
     */
    test('натискання "." додає десяткову точку', () => {
        expect(calculate({ total: '5', next: null, operation: null }, '.')).toEqual({
            total: '5.',
            next: null,
            operation: null
        });
    });

    /**
     * Перевіряє, що натискання оператора зберігає його в `operation`.
     */
    test('натискання оператора встановлює operation', () => {
        expect(calculate({ total: '5', next: null, operation: null }, '+')).toEqual({
            total: '5',
            next: null,
            operation: '+'
        });
    });

    /**
     * Перевіряє, що натискання "=" виконує математичну операцію
     * та повертає результат у `total`.
     */
    test('натискання "=" обчислює результат', () => {
        const state: CalcState = { total: '5', next: '3', operation: '+' };

        expect(calculate(state, '=')).toEqual({
            total: '8',
            next: null,
            operation: null
        });
    });

    /**
     * Перевіряє, що натискання "C" повністю скидає стан калькулятора.
     */
    test('натискання "C" скидає стан', () => {
        const state: CalcState = { total: '5', next: '3', operation: '+' };

        expect(calculate(state, 'C')).toEqual({
            total: null,
            next: null,
            operation: null
        });
    });
});
