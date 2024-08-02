import { ButtonHTMLAttributes, ReactNode } from "react";

//IButton наследует все атрибуты и методы от описанных в TS типах ButtonHTMLAttributes<HTMLButtonElement>
//Атрибуты обычной кнопки <Сам HTML элемент кнопка>
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    appearance: 'small' | 'big' | 'none',
    styleName?: string
}