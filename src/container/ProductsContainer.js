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

	onChangeSortBy = event => {
		const sortKey = event.target.value;
		this.props.productsSortBy(sortKey);
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
				{/*-----------*/}

				<form>
					<select onChange={this.onChangeSortBy}>
						<option>Domyślne</option>
						<option value="asc">Nazwa a-z</option>
						<option value="desc">Nazwa z-a</option>
					</select>
				</form>
				<br />

				{/*-----------*/}
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
