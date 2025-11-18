import React from 'react';
import '../css/Display.css';

export interface DisplayProps {
    /**
     * Значення, яке потрібно показати на екрані калькулятора.
     *
     * @remarks
     * Може бути:
     * - числом
     * - рядком
     * - null
     *
     * Якщо значення дорівнює `null` або порожньому рядку,
     * компонент автоматично відображає `'0'`.
     */
    value: string | number | null;
}

/**
 * Компонент `Display`
 *
 * Відповідає за відображення поточного значення на екрані калькулятора.
 * Приймає значення через проп `value` та показує його користувачу.
 *
 * @example
 * ```tsx
 * <Display value="123" />
 * <Display value={0} />
 * <Display value={null} /> // відобразить "0"
 * ```
 *
 * @param props Об'єкт властивостей компонента, що містить значення `value`.
 * @returns JSX-елемент із текстом для відображення.
 */
export const Display: React.FC<DisplayProps> = ({ value }) => {
    return (
        <div className="display">
            {value !== null && value !== '' ? value : '0'}
        </div>
    );
};
