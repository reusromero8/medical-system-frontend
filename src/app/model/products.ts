import { Category } from './category';
import { Family } from './family';
import { Laboratory } from './laboratory';

export class Product {
    idProduct?: number;
    name?: string;
    description?: string;
    presentation?: string;
    unitPrice?: number;
    stock?: number;
    expired?: string; // Formato: YYYY-MM-DD
    category?: Category;
    family?: Family;
    laboratory?: Laboratory;
}