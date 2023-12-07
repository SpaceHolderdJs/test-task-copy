import { Statuses } from "../statuses"

export interface IProducts {
    id: number,
    brand: string,
    category: string,
    description: string,
    discountPercentage: number,
    images: Array<string>,
    price: number,
    rating: number,
    stock: number,
    thumbnail: string,
    title: string
}

export interface INormalizeDto extends IProducts {
    createdAt: string,
    status: Statuses
}   
