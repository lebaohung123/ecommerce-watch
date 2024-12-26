import { useEffect, useState } from "react";
import { callApi } from "../api/axios";
import { useFilterContext } from "../context/FilterContext";

interface Product {
	category: string;
}

interface FetchResponse {
	products: Product[];
}

export const Sidebar = () => {
	const [categories, setCategories] = useState<string[]>([]);
	const [keywords] = useState<string[]>(["apple", "watch", "fashsion", "trend", "shoes", "shirt"]);
	const {queryString, setQueryString, selectedCategory, setSelectedCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, keyWord, setKeyWord} = useFilterContext();
	const handleResetFilter = () => {
		setQueryString('');
		setSelectedCategory('');
		setMinPrice(undefined);
		setMaxPrice(undefined);
		setKeyWord('');
	}
	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const response = await callApi<FetchResponse>("https://dummyjson.com/products", "GET");
				const uniqueCategories = Array.from(new Set(response.products.map((product) => product.category)));
				setCategories(uniqueCategories);
			} catch (error) {
				console.error("Error fetching product", error);
			}
		};
		fetchCategory();
	}, []);

	return (
		<div className="w-64 h-screen p-5">
			<h1 className="mt-4 mb-10 text-2xl font-bold">React Store</h1>

			<section>
				<input type="text" name="" id="" className="p-2 px-1 border-2 rounded sm:mb-0 mr-2" placeholder="Search Product" value={queryString} onChange={e => setQueryString(e.target.value)}/>

				<div className="flex items-center justify-between mt-2">
					<input type="text" name="" id="" className="w-full px-5 py-3 mr-2 border-2" placeholder="Min" value={minPrice} onChange={e => setMinPrice(Number(e.target.value))}/>
					<input type="text" name="" id="" className="w-full px-5 py-3 mr-2 border-2" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}/>
				</div>

				{/* Category section */}

				<div className="mb-5">
					<h2 className="mb-3 text-xl font-semibold">Categories</h2>
				</div>
				<section>
					{categories.map((category, index) => (
						<label key={index} className="block mb-2">
							<input type="radio" name="category" value={category} checked={selectedCategory === category} onChange={() => setSelectedCategory(category)} className="mr-2 w-[16px] h-[16px]" />
							{category.toUpperCase()}
						</label>
					))}
				</section>

				{/* Keywords Section */}
				<div className="mt-4 mb-4">
					<h2 className="mb-3 text-xl font-semibold">Keywords</h2>
					<div>
						{keywords.map((keyword, index) => (
							<button key={index} className={`block w-full px-4 py-2 mb-2 text-left border rounded hover:bg-gray-200 ${keyWord === keyword ? 'bg-black text-white' : ''}`} onClick={() => setKeyWord(keyword)}>
								{keyword.toUpperCase()}
							</button>
						))}
					</div>
				</div>

				<button className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5" onClick={handleResetFilter}>Reset Filters</button>
			</section>
		</div>
	);
};
