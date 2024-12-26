import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../api/axios";

interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	rating: number;
	images: string[];
}

const ProductPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [product, setProduct] = useState<Product | null>(null);

	const getProductById = async (id: string): Promise<void> => {
		const url = `https://dummyjson.com/products/${id}`;
		const response = await apiClient<Product>({ url, method: "GET" });
		setProduct(response.data);
	};

	useEffect(() => {
		if (id) {
			getProductById(id);
		}
	}, [id]);

	if (!product) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="p-5 w-[60%]">
			<button onClick={() => navigate(-1)} className="mb-5 px-4 py-2 bg-black text-white rounded">
				Back
			</button>

            <img src={product.images[0]} alt={product.title} className='w-[50%] h-auto mb-5' />

            <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
            <p className="mb-4 text-gray-700 w-[70%]">{product.description}</p>
            <div className="flex">
                <p>Price: ${product.price}</p>
                <p className="ml-10">Rating: {product.rating}</p>
            </div>
		</div>
	);
};

export default ProductPage;
