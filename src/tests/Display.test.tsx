/**
 * @module display.test
 *
 * Тести для React-компонента `Display`.
 *
 * @remarks
 * Компонент `Display` відповідає за відображення поточного значення калькулятора.
 * Тести перевіряють:
 * - поведінку при `null`
 * - поведінку при порожньому рядку
 * - рендер числового значення
 * - рендер рядкового значення
 *
 * Компонент повинен гарантовано показувати `"0"` у некоректних або відсутніх значеннях.
 */

import { render, screen } from '@testing-library/react';
import { Display } from '../components';
import React from "react";

describe('Display component', () => {

    /**
     * Перевіряє, що компонент показує "0",
     * коли value дорівнює null.
     */
    test('показує "0", якщо value null', () => {
        render(<Display value={null} />);
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    /**
     * Перевіряє, що компонент показує "0",
     * коли value — порожній рядок.
     */
    test('показує "0", якщо value порожній рядок', () => {
        render(<Display value={''} />);
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    /**
     * Перевіряє, що числове значення
     * відображається коректно.
     */
    test('показує передане числове значення', () => {
        render(<Display value={123} />);
        expect(screen.getByText('123')).toBeInTheDocument();
    });

    /**
     * Перевіряє, що рядкове значення
     * відображається коректно.
     */
    test('показує передане рядкове значення', () => {
        render(<Display value={'456'} />);
        expect(screen.getByText('456')).toBeInTheDocument();
    });
});
