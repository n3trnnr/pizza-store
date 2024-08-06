//Глобальные типы которые используются вне пропсов лучше выносить в отдельный 
//Типы с пропсами держать в папке компонента пропсы которого описывают

import { ICartItem } from "../store/cart.slice"

export interface IProductData {
    id: number,
    name: string,
    price: number,
    ingredients: string[],
    image: string,
    rating: number
}

export interface IFormdata {
    name?: string,
    email: string,
    password: string
}

export interface IUserData {
    email: string | undefined,
    id: number | null,
    name: string | undefined,
}

export interface IOrder {
    userId: number,
    products: IProductData[]
}

export interface ICart {
    id: number,
    userId: number,
    products: IProductData[],
    productsCart: ICartItem[]
}

export interface IDelivery extends IUserData {
    cart: ICart[]
}