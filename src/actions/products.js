import {
    PRODUCT_GET_SUCCESS,
    PRODUCT_GET_START,
    PRODUCT_GET_ERROR,
    PRODUCT_CHANGE_PAGE,
} from '../constants';

import axios from 'axios';

export function changePageProducts(pageNumber) {
    return {
        type: PRODUCT_CHANGE_PAGE,
        payload: {
            pageNumber,
        },
    };
}

export function getProductStart() {
    return {
        type: PRODUCT_GET_START,
    };
}
export function getProductSuccess(data) {
    return {
        type: PRODUCT_GET_SUCCESS,
        payload: {
            data,
        },
    };
}

export function getProductError(error) {
    return {
        type: PRODUCT_GET_ERROR,
        payload: {
            error,
        },
    };
}

export function getProducts() {
    //const url = 'http://api.rossmann.pl/products?rows=6&sort=1';
    const url = 'http://api.rossmann.pl/products';

    return dispatch => {
        dispatch(getProductStart());
        axios
            .get(url)
            .then(response => response.data)
            .then(data => {
                const products = data.Value.ProductList;
                console.log(data);
                console.log(products);
                return dispatch(getProductSuccess(products));
            })
            .catch(error => dispatch(getProductError(error)));
    };
}
