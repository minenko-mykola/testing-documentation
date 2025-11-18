/**
 * Виконує базові арифметичні операції над двома числами.
 *
 * Функція приймає два числа у вигляді рядків (`num1`, `num2`)
 * та оператор (`operation`) і повертає результат обчислення.
 *
 * Підтримувані операції:
 * - `+` — додавання
 * - `-` — віднімання
 * - `*` — множення
 * - `/` — ділення
 *
 * У разі ділення на нуль функція повертає `'Error'`.
 * Якщо оператор невідомий, повертається `'0'`.
 *
 * @param num1 Перше число у вигляді рядка.
 * @param num2 Друге число у вигляді рядка.
 * @param operation Символ арифметичної операції.
 *
 * @returns Результат операції у вигляді рядка або `'Error'`.
 *
 * @example
 * ```ts
 * operate("2", "3", "+"); // "5"
 * operate("10", "5", "/"); // "2"
 * operate("5", "0", "/"); // "Error"
 * operate("2", "3", "%"); // "0"
 * ```
 */
export const operate = (num1: string, num2: string, operation: string): string => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    switch (operation) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':
            return (a * b).toString();
        case '/':
            return b === 0 ? 'Error' : (a / b).toString();
        default:
            return '0';
    }
};
