import { ICategory } from '../interfaces/category.interfaces';

export class Category implements ICategory{
    constructor(
        public id: number,
        public categoryName: string,
    ){}
}