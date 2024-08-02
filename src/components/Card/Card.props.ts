import { MouseEvent } from "react";

export interface ICard {
    id: number,
    title: string,
    description: string[],
    price: string | number,
    rating: string | number,
    img: string,
    getId?: (e: MouseEvent, id: number) => void
}