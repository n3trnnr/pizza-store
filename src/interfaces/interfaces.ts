//Глобальные типы которые используются вне пропсов лучше выносить в отдельный 
//Типы с пропсами держать в папке компонента пропсы которого описывают

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
    id: number | undefined,
    name: string | undefined,
}

export interface IOrder {
    userId: number,
    products: IProductData[]
}