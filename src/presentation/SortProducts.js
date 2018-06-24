import React from 'react';
import PropTypes from 'prop-types';

const SortProducts = props => {
	return (
		<form>
			<label>Sortuj wg: </label>
			<select onChange={props.sortBy.bind(this)} value={props.sortOrder}>
				<option value="" disabled hidden>
					Wybierz
				</option>
				<option value="asc">Nazwa a-z</option>
				<option value="desc">Nazwa z-a</option>
			</select>
		</form>
	);
};

SortProducts.propTypes = {
	sortBy: PropTypes.func.isRequired,
	sortOrder: PropTypes.string.isRequired,
};

export default SortProducts;
