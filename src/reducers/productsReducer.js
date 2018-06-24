import {
	PRODUCTS_GET_SUCCESS,
	PRODUCTS_GET_START,
	PRODUCTS_GET_ERROR,
	PRODUCTS_CHANGE_PAGE,
	PRODUCTS_CHANGE_QUANTITY,
	PRODUCTS_SORT_BY,
} from '../constants';

const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

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
			let sortedProducts = null;

			sortedProducts = stateCopy.products.sort((a, b) => {
				let product1 = a['Name'].toLowerCase();
				let product2 = b['Name'].toLowerCase();

				switch (sortOrder) {
					case SORT_ASC:
						return product1 < product2 ? -1 : 1;
					case SORT_DESC:
						return product1 > product2 ? -1 : 1;
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
