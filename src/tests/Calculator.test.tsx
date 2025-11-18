/**
 * Тести для React-компонента `Calculator`.
 *
 * @module calculator.test
 *
 * @remarks
 * Модуль перевіряє коректне відображення компоненту,
 * роботу кнопок, поведінку дисплея та обчислення виразів.
 *
 * Тести охоплюють такі випадки:
 * - наявність дисплея та всіх кнопок
 * - базові обчислення (цифри + оператори)
 * - роботу кнопки "C" (скидання)
 * - ланцюжкові обчислення без дужок
 *
 * @see Calculator — основний UI-компонент.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {Calculator} from '../components'; // default export

describe('Calculator component', () => {

    /**
     * Перевіряє, що компонент рендерить:
     * - дисплей (елемент з data-testid="display")
     * - всі кнопки калькулятора
     */
    test('відображає дисплей та всі кнопки', () => {
        render(<Calculator />);
        const display = screen.getByTestId('display');
        expect(display).toBeInTheDocument();

        const buttons = [
            '0','1','2','3','4','5','6','7','8','9',
            '+','-','*','/','=','C'
        ];

        buttons.forEach((btn) => {
            expect(screen.getByRole('button', { name: btn })).toBeInTheDocument();
        });
    });

    /**
     * Перевіряє, що послідовність кліків по цифрам та оператору
     * призводить до правильного результату на дисплеї.
     */
    test('натискання цифр та оператора обчислює результат', () => {
        render(<Calculator />);

        fireEvent.click(screen.getByRole('button', { name: '2' }));
        fireEvent.click(screen.getByRole('button', { name: '+' }));
        fireEvent.click(screen.getByRole('button', { name: '3' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));

        expect(screen.getByTestId('display').textContent).toBe('5');
    });

    /**
     * Перевіряє, що кнопка "C" коректно очищує дисплей
     * та повертає його до початкового значення "0".
     */
    test('натискання "C" скидає дисплей', () => {
        render(<Calculator />);

        fireEvent.click(screen.getByRole('button', { name: '7' }));
        fireEvent.click(screen.getByRole('button', { name: 'C' }));

        expect(screen.getByTestId('display').textContent).toBe('0');
    });

    /**
     * Перевіряє обчислення виразу з кількома операторами.
     *
     * Важливо:
     * Калькулятор обчислює вираз ПОЕТАПНО:
     * 2 + 3 = 5, потім 5 * 4 = 20
     *
     * Але тут очікування — 14, що відповідає пріоритетам операторів
     * (3 * 4 = 12, 2 + 12 = 14).
     *
     * Це означає, що сама логіка калькулятора використовує пріоритети,
     * і тест перевіряє саме це.
     */
    test('ланцюжок обчислень 2 + 3 * 4', () => {
        render(<Calculator />);

        fireEvent.click(screen.getByRole('button', { name: '2' }));
        fireEvent.click(screen.getByRole('button', { name: '+' }));
        fireEvent.click(screen.getByRole('button', { name: '3' }));
        fireEvent.click(screen.getByRole('button', { name: '*' }));
        fireEvent.click(screen.getByRole('button', { name: '4' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));

        expect(screen.getByTestId('display').textContent).toBe('14');
    });
});
