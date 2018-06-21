import {
	PRODUCT_GET_SUCCESS,
	PRODUCT_GET_START,
	PRODUCT_GET_ERROR,
} from '../constants';

const initialState = {
	products: [],
	isLoading: false,
	isError: false,
};

export function productsReducer(state = initialState, action) {
	switch (action.type) {
		case PRODUCT_GET_START:
			return {
				...state,
				isLoading: true,
			};
		case PRODUCT_GET_SUCCESS:
			return {
				...state,
				products: action.payload.data,
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
