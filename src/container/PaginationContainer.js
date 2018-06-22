import React, { Component, Fragment } from 'react';

class Pagination extends Component {
	pages() {
		let pages = [];

		for (let i = 1; i <= this.props.quantityPages; i++) {
			pages.push(i);
		}
		return pages;
	}

	onChangePage(page) {
		this.props.onChangePage(page);
	}

	onPreviousPage() {
		return this.props.currentPage - 1;
	}

	onNextPage() {
		return this.props.currentPage + 1;
	}

	render() {
		const previous = (
			<li>
				<a
					onClick={this.onChangePage.bind(
						this,
						this.onPreviousPage()
					)}
				>
					prev
				</a>
			</li>
		);
		const next = (
			<li>
				<a onClick={this.onChangePage.bind(this, this.onNextPage())}>
					next
				</a>
			</li>
		);
		const firsPage = (
			<li>
				<a onClick={this.onChangePage.bind(this, 1)}>first</a>
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
					last
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
					{firsPage}
					{previous}
					{pages}
					{next}
					{lastPage}
				</ul>
			</Fragment>
		);
	}
}

export default Pagination;
