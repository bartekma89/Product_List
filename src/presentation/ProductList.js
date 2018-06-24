import React, { Fragment } from 'react';
import Product from './Product';
import PropTypes from 'prop-types';

const ProductList = props => {
	const { products } = props;
	return (
		<Fragment>
			<ul>
				{products.map(product => (
					<Product key={product.Id} {...product} />
				))}
			</ul>
		</Fragment>
	);
};

ProductList.propTypes = {
	products: PropTypes.array.isRequired,
};

export default ProductList;
