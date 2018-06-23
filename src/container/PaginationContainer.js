import React, { Component, Fragment } from 'react';

class Pagination extends Component {
	pages() {
		let pages = [];

		console.log(`rangeStart: ${this.rangeStart()}`);
		console.log(`rangeEnd: ${this.rangeEnd()}`);

		for (let i = this.rangeStart(); i <= this.rangeEnd(); i++) {
			pages.push(i);
		}
		console.log(pages);
		return pages;
	}

	rangeStart() {
		let margin = 1;
		let startPage = this.props.currentPage - margin;
		return this.props.currentPage > margin ? startPage : 1;
	}

	rangeEnd() {
		let margin = 1;
		let endPage = this.props.currentPage + margin;
		return endPage > this.props.quantityPages
			? this.props.quantityPages
			: endPage;
	}

	onChangePage(page) {
		this.props.onChangePage(page);
	}

	previousPage() {
		return this.props.currentPage - 1;
	}

	nextPage() {
		return this.props.currentPage + 1;
	}

	hasPrev() {
		return this.previousPage() < 1;
	}

	hasNext() {
		return this.nextPage() > this.props.quantityPages;
	}

	render() {
		const hidden = { display: 'none' };

		const previous = (
			<li style={this.hasPrev() ? hidden : null}>
				<a onClick={this.onChangePage.bind(this, this.previousPage())}>
					prev
				</a>
			</li>
		);
		const next = (
			<li style={this.hasNext() ? hidden : null}>
				<a onClick={this.onChangePage.bind(this, this.nextPage())}>
					next
				</a>
			</li>
		);
		const firsPage = (
			<li>
				<a onClick={this.onChangePage.bind(this, 1)}>1 - firstPage</a>
			</li>
		);
		const lastPage = (
			<li>
				<a
					onClick={this.onChangePage.bind(
						this,
						this.props.quantityPages
					)}
				>
					{this.props.quantityPages} - lastPage
				</a>
			</li>
		);
		const pages = this.pages().map((page, index) => {
			return (
				<li key={index}>
					<a onClick={this.onChangePage.bind(this, page)}>{page}</a>
				</li>
			);
		});

		return (
			<Fragment>
				<ul>
					{previous}
					{firsPage}
					{pages}
					{lastPage}
					{next}
				</ul>
			</Fragment>
		);
	}
}

export default Pagination;
