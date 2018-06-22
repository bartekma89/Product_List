import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../actions/products';
import ProductList from '../presentation/ProductList';

class Products extends Component {
	componentDidMount() {
		this.props.getProducts();
	}

	render() {
		return (
			<Fragment>
				<ProductList products={this.props.products} />
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
