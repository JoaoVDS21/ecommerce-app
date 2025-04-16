import { Banner, Product } from '../types';
import HttpClient from './utils/HttpClient';

class BannersService {
	httpClient: HttpClient;

	constructor(){
		this.httpClient = new HttpClient();
	}

	async findAll(): Promise<Banner[]> {
		const stmt = await this.httpClient.get('/banners');
		
		return stmt?.map((banner: Banner) => ({
			...banner,
			imageUrl: `${this.httpClient.baseURL}${banner.imageUrl || this.httpClient.defaultImg}`
		}))
	}

	async findOne(id: number | string): Promise<Banner> {
		const stmt = await this.httpClient.get(`/banners/${id}`);

		return stmt ? {
			...stmt,
			imageUrl: `${this.httpClient.baseURL}${stmt.imageUrl || this.httpClient.defaultImg}`
		} : stmt
	}
}

export default new BannersService();
