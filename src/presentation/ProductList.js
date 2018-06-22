import React, { Fragment } from 'react';
import Product from './Product';

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

export default ProductList;
