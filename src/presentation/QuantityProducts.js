import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const QuantityProducts = props => {
	return (
		<Fragment>
			<form>
				<label>Produktów na stronie: </label>
				<select
					onChange={props.changeQuantityProducts}
					value={props.quantityProductsOnPage}
				>
					<option value="24">24</option>
					<option value="48">48</option>
					<option value="66">66</option>
				</select>
			</form>
		</Fragment>
	);
};

QuantityProducts.propTypes = {
	quantityProductsOnPage: PropTypes.number.isRequired,
	changeQuantityProducts: PropTypes.func.isRequired,
};

export default QuantityProducts;
