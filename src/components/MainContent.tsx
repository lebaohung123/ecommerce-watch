import { useEffect, useState } from "react";
import { useFilterContext } from "../context/FilterContext";
import { Tally2 } from "lucide-react";
import { callApi } from "../api/axios";

const MainContent = () => {
	const { queryString, selectedCategory, minPrice, maxPrice, keyWord } = useFilterContext();
	const [products, setProducts] = useState<any[]>([]);
	const [filter, setFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const itemsPerPage = 12;

	useEffect(() => {
		const fetchData = async () => {
			let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip${(currentPage - 1) * itemsPerPage}`;
			if (keyWord) {
				url = `https://dummyjson.com/products/search?q=${keyWord}`;
			}
			const response = await callApi<any[]>(url, "GET");
			setProducts(response);
		};
		fetchData();
	}, [currentPage, keyWord]);

	const getFilteredProducts = () => {
		let filteredProducts = products;
		if (selectedCategory) {
			filteredProducts.filter((product) => product.category === selectedCategory);
		}
		console.log(filteredProducts);
	};

	getFilteredProducts();

	return (
		<section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
			<div className="mb-5">
				<div className="flex flex-col items-center justify-between sm:flex-row">
					<div className="relative mt-5 mb-5">
						<button className="flex items-center px-4 py-2 border rounded-full">
							<Tally2 className="mr-2"></Tally2>

							{filter === "all" ? "Filter" : filter.charAt(0).toLowerCase() + filter.slice(1)}

							{dropdownOpen && (
								<div className="absolute w-full mt-5 bg-white border border-gray-300 rounded top-10 left-0 sm:w-40">
									<button onClick={() => setFilter("cheap")} className="block w-full px-4 py-2 text-left hover:bg-gray-200">
										Cheap
									</button>
									<button onClick={() => setFilter("expensive")} className="block w-full px-4 py-2 text-left hover:bg-gray-200">
										Expensive
									</button>
									<button onClick={() => setFilter("popular")} className="block w-full px-4 py-2 text-left hover:bg-gray-200">
										Popular
									</button>
								</div>
							)}

							<div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">{/* Bookcard */}</div>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MainContent;
