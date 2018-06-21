import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../actions/products';

class Products extends Component {
	componentDidMount() {
		this.props.getProducts();
	}

	render() {
		return (
			<Fragment>
				<ul>
					{this.props.products.map(product => {
						const {
							Name,
							MediumPictureUrl,
							OpinionIntro,
							AverageRating,
							OldPrice,
							Price,
							IsPromotion,
						} = product;

						function regexSupport(arg) {
							const regex = /(<([^>]+)>)/gi;
							return arg.replace(regex, '');
						}

						const opinionIntro = regexSupport(OpinionIntro);

						return (
							<li key={product.Id}>
								<div>{Name}</div>
								<div>
									<img src={MediumPictureUrl} alt="product" />
								</div>
								<div>Opinion: {OpinionIntro}</div>
								<div>Rating: {AverageRating}</div>
								{IsPromotion ? (
									<div>OldPrice: {OldPrice}</div>
								) : null}
								<div>Price: {Price}</div>
							</li>
						);
					})}
				</ul>
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
