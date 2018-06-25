import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {
	pages() {
		let pages = [];
		for (let i = this.rangeStart(); i <= this.rangeEnd(); i++) {
			pages.push(i);
		}
		return pages;
	}

	rangeStart() {
		let startPage = this.props.currentPage - this.props.sideElement;
		return this.props.currentPage > this.props.sideElement ? startPage : 1;
	}

	rangeEnd() {
		let endPage = this.props.currentPage + this.props.sideElement;
		return endPage > this.props.quantityPages
			? this.props.quantityPages
			: endPage;
	}

	onChangePage = page => {
		this.props.changePage(page);
	};

	previousPage = () => this.props.currentPage - 1;

	nextPage = () => this.props.currentPage + 1;

	hasPrev = () => this.previousPage() >= 1;

	hasNext = () => this.nextPage() <= this.props.quantityPages;

	goLastPage = () => {
		this.props.changePage(this.props.quantityPages);
	};

	goFirstPage = () => {
		this.props.changePage(1);
	};

	render() {
		const previous = this.hasPrev() ? (
			<li>
				<a onClick={() => this.onChangePage(this.previousPage())}>
					prev
				</a>
			</li>
		) : null;

		const next = this.hasNext() ? (
			<li>
				<a onClick={() => this.onChangePage(this.nextPage())}>next</a>
			</li>
		) : null;

		const firstPage =
			this.props.currentPage - this.props.sideElement > 1 ? (
				<li>
					<a onClick={this.goFirstPage}>1</a>
				</li>
			) : null;

		const lastPage =
			this.props.currentPage + this.props.sideElement <
			this.props.quantityPages ? (
				<li>
					<a onClick={this.goLastPage}>{this.props.quantityPages}</a>
				</li>
			) : null;

		const pages = this.pages().map((page, index) => {
			return (
				<li key={index}>
					<a
						onClick={() => this.onChangePage(page)}
						style={
							this.props.currentPage === page
								? { color: 'red', fontWeight: 'bold' }
								: null
						}
					>
						{page}
					</a>
				</li>
			);
		});

		return (
			<Fragment>
				<ul>
					{previous}
					{firstPage}
					{pages}
					{lastPage}
					{next}
				</ul>
			</Fragment>
		);
	}
}

Pagination.propTypes = {
	quantityPages: PropTypes.number.isRequired,
	sideElement: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	changePage: PropTypes.func.isRequired,
};

export default Pagination;
