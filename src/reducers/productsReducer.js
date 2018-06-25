import {
	PRODUCTS_GET_SUCCESS,
	PRODUCTS_GET_START,
	PRODUCTS_GET_ERROR,
	PRODUCTS_CHANGE_PAGE,
	PRODUCTS_CHANGE_QUANTITY,
	PRODUCTS_SORT_BY,
} from '../constants';

const initialState = {
	products: [],
	renderedProducts: [],
	isLoading: false,
	isError: false,
	productsPerPage: 24,
	currentPage: 1,
	sortOrder: '',
};

const createCurrentProducts = (products, currentPage, productsPerPage) => {
	return products.slice(
		(currentPage - 1) * productsPerPage,
		(currentPage - 1) * productsPerPage + productsPerPage
	);
};

export function productsReducer(state = initialState, action) {
	switch (action.type) {
		case PRODUCTS_SORT_BY:
			const stateCopy = { ...state };
			const sortOrder = action.payload.sortOrder;

			const sortedProducts = stateCopy.products.sort((a, b) => {
				switch (sortOrder) {
					case 'ascName':
						return a['Name'].toLowerCase() < b['Name'].toLowerCase()
							? -1
							: 1;
					case 'descName':
						return a['Name'].toLowerCase() > b['Name'].toLowerCase()
							? -1
							: 1;
					case 'ascPrice':
						return a['Price'] - b['Price'];
					case 'descPrice':
						return b['Price'] - a['Price'];
					default:
						return 0;
				}
			});

			return {
				...state,
				products: sortedProducts,
				renderedProducts: createCurrentProducts(
					sortedProducts,
					state.currentPage,
					state.productsPerPage
				),
				sortOrder,
			};

		case PRODUCTS_CHANGE_QUANTITY: {
			const productsPerPage = Number(action.payload.quantityProducts);

			const currentProducts = createCurrentProducts(
				state.products,
				state.currentPage,
				productsPerPage
			);

			return {
				...state,
				productsPerPage,
				renderedProducts: currentProducts,
			};
		}
		case PRODUCTS_CHANGE_PAGE:
			const currentProducts = createCurrentProducts(
				state.products,
				action.payload.currentPageNumber,
				state.productsPerPage
			);

			return {
				...state,
				renderedProducts: currentProducts,
				currentPage: action.payload.currentPageNumber,
			};
		case PRODUCTS_GET_START:
			return {
				...state,
				isLoading: true,
			};
		case PRODUCTS_GET_SUCCESS:
			return {
				...state,
				products: action.payload.data,
				renderedProducts: action.payload.data.slice(
					0,
					state.productsPerPage
				),
				isLoading: false,
				isError: false,
			};
		case PRODUCTS_GET_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		default:
			return state;
	}
}
