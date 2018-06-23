import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
	getProducts,
	changePageProducts,
	changeQuantityProductsOnPage,
} from '../actions/products';
import ProductList from '../presentation/ProductList';
import Pagination from './PaginationContainer';

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
				<form>
					<label>Produktów na stronie: </label>
					<select
						onChange={this.onChangeQuantityProducts}
						value={this.props.productsPerPage}
					>
						<option value="24">24</option>
						<option value="48">48</option>
						<option value="66">66</option>
					</select>
				</form>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
