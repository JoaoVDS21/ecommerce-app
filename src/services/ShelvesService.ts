import { Category, Product, Shelf } from '../types';
import HttpClient from './utils/HttpClient';

class ShelvesService {
	httpClient: HttpClient;

	constructor(){
		this.httpClient = new HttpClient();
	}

	async findAll(): Promise<Shelf[]> {
		const stmt = await this.httpClient.get('/shelves');
		
		return stmt?.map((shelf: Shelf) => ({
			...shelf,
			imageUrl: `${this.httpClient.baseURL}${shelf.imageUrl || this.httpClient.defaultImg}`,
			products: shelf.products.map((product: Product) => ({
				...product,
				imageUrl: `${this.httpClient.baseURL}${product.imageUrl || this.httpClient.defaultImg}`
			}))
		}))
	}

	async findOne(id: number | string): Promise<Shelf> {
		const stmt = await this.httpClient.get(`/shelves/${id}`);

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

export default new ShelvesService();
