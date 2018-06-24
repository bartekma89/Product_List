import {
    PRODUCTS_GET_SUCCESS,
    PRODUCTS_GET_START,
    PRODUCTS_GET_ERROR,
    PRODUCTS_CHANGE_PAGE,
    PRODUCTS_CHANGE_QUANTITY,
    PRODUCTS_SORT_BY,
} from '../constants';

import axios from 'axios';

export function productsSortBy(sortOrder) {
    return {
        type: PRODUCTS_SORT_BY,
        payload: {
            sortOrder,
        },
    };
}

export function changeQuantityProductsOnPage(quantityProducts) {
    return {
        type: PRODUCTS_CHANGE_QUANTITY,
        payload: {
            quantityProducts,
        },
    };
}

export function changePageProducts(currentPageNumber) {
    return {
        type: PRODUCTS_CHANGE_PAGE,
        payload: {
            currentPageNumber,
        },
    };
}

export function getProductStart() {
    return {
        type: PRODUCTS_GET_START,
    };
}
export function getProductSuccess(data) {
    return {
        type: PRODUCTS_GET_SUCCESS,
        payload: {
            data,
        },
    };
}

export function getProductError(error) {
    return {
        type: PRODUCTS_GET_ERROR,
        payload: {
            error,
        },
    };
}

export function getProducts() {
    const url = 'http://api.rossmann.pl/products?rows=500&sort=1';
    //const url = 'http://api.rossmann.pl/products';

    return dispatch => {
        dispatch(getProductStart());
        axios
            .get(url)
            .then(response => response.data)
            .then(data => {
                const products = data.Value.ProductList;
                return dispatch(getProductSuccess(products));
            })
            .catch(error => dispatch(getProductError(error)));
    };
}
