import {
	PRODUCT_GET_SUCCESS,
	PRODUCT_GET_START,
	PRODUCT_GET_ERROR,
	PRODUCT_CHANGE_PAGE,
} from '../constants';

const initialState = {
	products: [],
	renderedProducts: [],
	isLoading: false,
	isError: false,
	productsPerPage: 6,
	currentPage: 1,
};

export function productsReducer(state = initialState, action) {
	switch (action.type) {
		case PRODUCT_CHANGE_PAGE:
			const currentPage = action.payload.pageNumber;
			const currentProducts = state.products.slice(
				(currentPage - 1) * state.productsPerPage,
				(currentPage - 1) * state.productsPerPage +
					state.productsPerPage
			);
			return {
				...state,
				renderedProducts: currentProducts,
				currentPage,
			};
		case PRODUCT_GET_START:
			return {
				...state,
				isLoading: true,
			};
		case PRODUCT_GET_SUCCESS:
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
		case PRODUCT_GET_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		default:
			return state;
	}
}
