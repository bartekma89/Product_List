import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
	getProducts,
	changePageProducts,
	changeQuantityProductsOnPage,
	productsSortBy,
} from '../actions/products';
import ProductList from '../presentation/ProductList';
import Pagination from './PaginationContainer';
import QuantityProducts from '../presentation/QuantityProducts';
import SortProducts from '../presentation/SortProducts';

class Products extends Component {
	componentDidMount() {
		this.props.getProducts();
	}

	onChangePage = page => {
		this.props.changePage(page);
	};

	onChangeQuantityProducts = event => {
		const quantityProducts = event.target.value;
		this.props.changeQuantityProductsOnPage(quantityProducts);
	};

	onSortBy = event => {
		this.props.productsSortBy(event.target.value);
	};

	render() {
		return (
			<Fragment>
				<Pagination
					quantityPages={Math.ceil(
						this.props.products.length / this.props.productsPerPage
					)}
					sideElement={1}
					currentPage={this.props.currentPage}
					changePage={this.onChangePage}
				/>
				<SortProducts
					sortBy={this.onSortBy}
					sortOrder={this.props.sortOrder}
				/>
				<br />
				<QuantityProducts
					quantityProductsOnPage={this.props.productsPerPage}
					changeQuantityProducts={this.onChangeQuantityProducts}
				/>
				<ProductList products={this.props.renderedProducts} />
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		...state,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getProducts: () => dispatch(getProducts()),
		changePage: page => dispatch(changePageProducts(page)),
		changeQuantityProductsOnPage: quantityPages =>
			dispatch(changeQuantityProductsOnPage(quantityPages)),
		productsSortBy: sortKey => dispatch(productsSortBy(sortKey)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
