import { InputHTMLAttributes } from "react";

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    labelName?: string,
    appearance?: 'small' | 'big'
}

