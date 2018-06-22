import React, { Fragment } from 'react';

const Product = props => {
	const {
		Name,
		MediumPictureUrl,
		OpinionIntro,
		AverageRating,
		OldPrice,
		Price,
		IsPromotion,
	} =
		props || {};

	function regexSupport(arg) {
		const regex = /\{([\s\S]+?)\}|<([\s\S]+?)>|(\.\w{1,10})/gi;
		return arg.replace(regex, '');
	}

	const opinionIntro = regexSupport(OpinionIntro);
	return (
		<Fragment>
			<li>
				<div>{Name}</div>
				<div>
					<img src={MediumPictureUrl} alt="product" />
				</div>
				<div>Opinion: {opinionIntro}</div>
				<div>Rating: {AverageRating}</div>
				{IsPromotion ? <div>OldPrice: {OldPrice}</div> : null}
				<div>Price: {Price}</div>
			</li>
		</Fragment>
	);
};

export default Product;
