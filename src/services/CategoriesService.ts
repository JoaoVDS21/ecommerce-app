import { Category, Product } from '../types';
import HttpClient from './utils/HttpClient';

class CategoriesService {
	httpClient: HttpClient;

	constructor(){
		this.httpClient = new HttpClient();
	}

	async findAll(): Promise<Category[]> {
		const stmt = await this.httpClient.get('/categories');
		
		return stmt?.map((category: Category) => ({
			...category,
			imageUrl: `${this.httpClient.baseURL}${category.imageUrl || this.httpClient.defaultImg}`,
			products: category.products.map((product: Product) => ({
				...product,
				imageUrl: `${this.httpClient.baseURL}${product.imageUrl || this.httpClient.defaultImg}`
			}))
		}))
	}

	async findOne(id: number | string): Promise<Category> {
		const stmt = await this.httpClient.get(`/categories/${id}`);

		return stmt ? {
			...stmt,
			imageUrl: `${this.httpClient.baseURL}${stmt.imageUrl || this.httpClient.defaultImg}`,
			products: stmt?.products?.map((product: Product) => ({
				...product, 
				imageUrl: `${this.httpClient.baseURL}${product.imageUrl || this.httpClient.defaultImg}`
			}))
		} : stmt
	}
}

export default new CategoriesService();
