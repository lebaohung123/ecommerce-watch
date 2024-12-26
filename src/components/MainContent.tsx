import { Tally2 } from "lucide-react";
import { useEffect, useState } from "react";
import { callApi } from "../api/axios";
import { useFilterContext } from "../context/FilterContext";
import BookCard from "./BookCard";

interface ResponseType {
	products: any[];
	total: number;
	skip: number;
	limit: number;
}

const MainContent = () => {
	const { queryString, selectedCategory, minPrice, maxPrice, keyWord } = useFilterContext();
	const [products, setProducts] = useState<any[]>([]);
	const [filter, setFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const itemsPerPage = 12;
	const [totalItems, setTotalItems] = useState<number | undefined>(undefined);
	const totalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 0;

	useEffect(() => {
		const fetchData = async () => {
			let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;
			if (keyWord) {
				url = `https://dummyjson.com/products/search?q=${keyWord}`;
			}
			const response = await callApi<ResponseType>(url, "GET");
			setTotalItems(response.total);
			setProducts(response.products);
		};
		fetchData();
	}, [currentPage, keyWord]);
	const getFilteredProducts = () => {
		let filteredProducts = products;
		if (queryString) {
			filteredProducts = filteredProducts.filter((product) => product.title.toLowerCase().includes(queryString.toLowerCase()));
		}
		if (selectedCategory) {
			filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
		}
		if (minPrice !== undefined) {
			filteredProducts = filteredProducts.filter((product) => product.price >= minPrice);
		}
		if (maxPrice !== undefined) {
			filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice);
		}
		switch (filter) {
			case "expensive":
				return filteredProducts.sort((a, b) => b.price - a.price);
			case "cheap":
				return filteredProducts.sort((a, b) => a.price - b.price);
			case "popular":
				return filteredProducts.sort((a, b) => b.rating - a.rating);
			default:
				return filteredProducts;
		}
	};

	const handlePageChange = (pos: string): void => {
		let checkCurrentPage;
		switch (pos) {
			case "pre":
				checkCurrentPage = currentPage - 1;
				break;
			case "next":
				checkCurrentPage = currentPage + 1;
				break;
			default:
				return;
		}
		if (checkCurrentPage <= 0 || checkCurrentPage > totalPages) {
			return;
		}
		setCurrentPage(checkCurrentPage);
	};

	const filteredProducts = getFilteredProducts();

	const getPaginationButtons = (): number[] => {
		const buttons: number[] = [];
		let startPage = Math.max(1, currentPage - 2);
		let endPage = Math.min(totalPages, currentPage + 2);

		if (currentPage - 2 < 1) {
			endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
		}

		if (currentPage + 2 > totalPages) {
			startPage = Math.max(1, startPage - (currentPage + 2 - totalPages));
		}

		for (let page = startPage; page <= endPage; page++) {
			buttons.push(page);
		}
		return buttons;
	};

	return (
		<section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5 mr-[10rem]">
			<div className="mb-5">
				<div className="flex flex-col items-center justify-between sm:flex-row">
					<div className="relative mt-5 mb-5">
						<button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center px-4 py-2 border rounded-full">
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
						</button>
					</div>
				</div>
			</div>
			{/* Bookcard */}
			<div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
				{filteredProducts.map((product) => (
					<BookCard key={product.id} id={product.id} title={product.title} image={product.thumbnail} price={product.price} />
				))}
			</div>
			{/* Pagination */}
			<div className="flex flex-col sm:flex-row justify-between items-center mt-5">
				<button
					className={`border px-4 py-2 mx-2 rounded-full ${currentPage === 1 && "bg-gray-500"}`}
					onClick={() => handlePageChange("pre")}
				>
					Previous
				</button>
				<div className="flex flex-wrap justify-center">
					{getPaginationButtons().map((page) => (
						<button
							key={page}
							onClick={() => setCurrentPage(page)}
							className={`border px-4 py-2 mx-1 rounded-full ${page === currentPage ? "bg-black text-white" : ""}`}
						>
							{page}
						</button>
					))}
				</div>
				<button
					className={`border px-4 py-2 mx-2 rounded-full ${currentPage === totalPages && "bg-gray-500"}`}
					onClick={() => handlePageChange("next")}
				>
					Next
				</button>
			</div>
		</section>
	);
};

export default MainContent;
