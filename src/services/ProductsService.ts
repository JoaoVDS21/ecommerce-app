import { Product } from '../types';
import HttpClient from './utils/HttpClient';

class ProductsService {
	httpClient: HttpClient;

	constructor(){
		this.httpClient = new HttpClient();
	}

	async findAll(): Promise<Product[]> {
		const stmt = await this.httpClient.get('/products');
		
		return stmt?.map((product: Product) => ({
			...product,
			imageUrl: `${this.httpClient.baseURL}${product.imageUrl || this.httpClient.defaultImg}`
		}))
	}

	async findOne(id: number | string): Promise<Product> {
		const stmt = await this.httpClient.get(`/products/${id}`);

		return stmt ? {
			...stmt,
			imageUrl: `${this.httpClient.baseURL}${stmt.imageUrl || this.httpClient.defaultImg}`
		} : stmt
	}
}

export default new ProductsService();
