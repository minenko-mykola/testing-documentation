import { operate } from './operate';

/**
 * Стан калькулятора.
 *
 * @property total     Загальне накопичене значення (лівий операнд).
 * @property next      Поточне вводиме значення (правий операнд).
 * @property operation Обраний оператор (`+`, `-`, `*`, `/`) або null.
 */
export interface CalcState {
    total: string | null;
    next: string | null;
    operation: string | null;
}

/**
 * Тип значення кнопки, яку натискає користувач.
 * {@link calculate} приймає будь-який текст кнопки як рядок.
 */
export type ButtonValue = string;

/**
 * Основна логіка калькулятора.
 *
 * Приймає поточний стан калькулятора та значення кнопки,
 * яку натиснув користувач, і повертає новий стан.
 *
 * Підтримує такі дії:
 *
 * ### 1. Очищення
 * - **"C"** — скидає стан до початкового.
 *
 * ### 2. Введення цифр та крапки:
 * - символи від `0` до `9` та `.`
 * - вводяться у `total`, якщо оператора не обрано
 * - вводяться у `next`, якщо обрано оператор
 *
 * ### 3. Оператори:
 * - `+`, `-`, `*`, `/`
 * - якщо вже є `total`, `operation` і `next`, виконується обчислення
 * - якщо `total` порожній, але є `next`, переносить `next → total`
 *
 * ### 4. Дорівнює:
 * - **"="** обчислює вираз, якщо `total`, `next` і `operation` заповнені
 * - якщо даних недостатньо — повертає поточний стан
 *
 * @param state Поточний стан калькулятора.
 * @param buttonName Значення натиснутої кнопки.
 * @returns Новий стан калькулятора після обробки кнопки.
 *
 * @example
 * ```ts
 * calculate({ total: "2", next: "3", operation: "+" }, "=");
 * // → { total: "5", next: null, operation: null }
 * ```
 *
 * @example
 * ```ts
 * calculate({ total: "5", next: null, operation: null }, "7");
 * // → { total: "57", next: null, operation: null }
 * ```
 */
export const calculate = (state: CalcState, buttonName: ButtonValue): CalcState => {
    let { total, next, operation } = state;

    // --- C (Clear) ---
    if (buttonName === 'C') {
        return { total: null, next: null, operation: null };
    }

    // --- Numbers & dot ---
    if (/^[0-9.]$/.test(buttonName)) {
        if (operation) {
            next = next ? next + buttonName : buttonName;
        } else {
            total = total ? total + buttonName : buttonName;
        }
        return { total, next, operation };
    }

    // --- Operators (+, -, *, /) ---
    if (['+', '-', '*', '/'].includes(buttonName)) {
        if (next && operation && total) {
            // Виконання попередньої операції
            total = operate(total, next, operation);
            next = null;
        } else if (!total && next) {
            // Якщо користувач починає з операнда справа
            total = next;
            next = null;
        }
        operation = buttonName;
        return { total, next, operation };
    }

    // --- Equal (=) ---
    if (buttonName === '=') {
        if (next && operation && total) {
            total = operate(total, next, operation);
            next = null;
            operation = null;
            return { total, next, operation };
        } else {
            return state; // недостатньо даних для обчислення
        }
    }

    // --- Усі інші випадки (невідома кнопка) ---
    return state;
};
