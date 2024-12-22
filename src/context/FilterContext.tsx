import { createContext, ReactNode, useContext, useState } from "react";

type FilterType = {
	queryString: string;
	setQueryString: (query: string) => void;
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
	minPrice: number | undefined;
	setMinPrice: (price: number | undefined) => void;
	maxPrice: number | undefined;
	setMaxPrice: (price: number | undefined) => void;
	keyWord: string;
	setKeyWord: (keyword: string) => void;
};

const FilterContext = createContext<FilterType | undefined>(undefined);

const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [queryString, setQueryString] = useState<string>("");
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
	const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
	const [keyWord, setKeyWord] = useState<string>("");
	return (
		<FilterContext.Provider
			value={{
				queryString,
				setQueryString,
				selectedCategory,
				setSelectedCategory,
				minPrice,
				setMinPrice,
				maxPrice,
				setMaxPrice,
				keyWord,
				setKeyWord,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};

const useFilterContext = (): FilterType => {
	const context = useContext(FilterContext);
	if (!context) {
		throw new Error("Context must be used within Filter Provider");
	}
	return context;
};

export { FilterProvider, useFilterContext };
