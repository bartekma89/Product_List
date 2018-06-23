import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProducts, changePageProducts } from '../actions/products';
import ProductList from '../presentation/ProductList';
import Pagination from './PaginationContainer';

class Products extends Component {
	componentDidMount() {
		this.props.getProducts();
	}

	onChangePage(page) {
		this.props.changePage(page);
	}

	render() {
		return (
			<Fragment>
				<Pagination
					quantityPages={Math.ceil(
						this.props.products.length / this.props.productsPerPage
					)}
					sideElement={1}
					currentPage={this.props.currentPage}
					changePage={this.onChangePage.bind(this)}
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
