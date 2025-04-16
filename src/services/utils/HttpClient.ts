import axios from "@/config/axios";

export const defaultBaseUrl = 'http://192.168.15.3:3050';
export const defaultImg = '/uploads/placeholders/default.jpg';

interface OptionsType {
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
	body?: {},
	headers?: {[key: string]: any}
}
class HttpClient {
	baseURL: string;
	defaultImg: string;

	constructor(baseURL: string = defaultBaseUrl, imgPath: string = defaultImg) {
		this.baseURL = baseURL;
		this.defaultImg = imgPath;
	}

	get(path: string, options: {[key: string]: any} = {}){
		return this.makeRequest(path, {
			method: "GET",
			headers: options?.headers,
		})
	}

	post(path: string, options: {[key: string]: any} = {}){
		return this.makeRequest(path, {
			method: "POST",
			body: options?.body,
			headers: options?.headers,
		})
	}

	put(path: string, options: {[key: string]: any} = {}){
		return this.makeRequest(path, {
			method: "PUT",
			body: options?.body,
			headers: options?.headers,
		})
	}

	delete(path: string, options: {[key: string]: any} = {}){
		return this.makeRequest(path, {
			method: "DELETE",
			headers: options?.headers,
		})
	}

	async makeRequest(path: string, options: OptionsType){
		let headers: any = {
			'Content-Type' : 'application/json'
		};

		if(options.body && (options.headers && !options.headers['Content-Type'])){
			headers["Content-Type"] = "application/json";
		}

		if(options.headers){
			headers = {
				...headers,
				...options.headers
			};
		}

		const fullUrl  =`${this.baseURL}${path}`
		const payload = {
			method: options.method,
			data: headers['Content-Type'] === 'application/json' ? JSON.stringify(options.body) : options.body,
			headers
		}
		
		const response = await axios(fullUrl, payload);
	
		return response.data;
	}
}

export default HttpClient;
