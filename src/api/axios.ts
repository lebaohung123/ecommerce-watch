import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type ApiResponse<T> = T;

const apiClient: AxiosInstance = axios.create({
	baseURL: "",
	timeout: 3000,
	headers: {
		"Content-Type": "application/json",
	},
});

export const callApi = async <T>(
	url: string,
	method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
	data: unknown = null,
	config: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> => {
	try {
		const response: AxiosResponse<ApiResponse<T>> = await apiClient({
			url,
			method,
			data,
			...config,
		});
		return response.data;
	} catch (error) {
		console.error("API call error");
		throw error;
	}
};

export default apiClient;
