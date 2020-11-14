import React from 'react';
import './Search.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../actions';

class Search extends React.Component {
	state = { term: '', infoItems: [] };
	componentDidMount() {
		this.props.fetchStreams().then(() => {
			const searchDataAr = Object.values(this.props.streams);
			this.setState({ infoItems: searchDataAr });
		});
	}
	findMatches = (matchedWord, infoItems) => {
		return infoItems.filter((infoItem) => {
			//filter so only the title or description that matches the word typed is left in the array
			const regex = new RegExp(matchedWord, 'gi');
			return infoItem.title.match(regex) || infoItem.description.match(regex);
		});
	};

	handleOnChange = (e) => {
		return (e) =>
			this.setState({
				term: e.target.value,
			});
	};
	searchResult = (term, matches) => {
		if (term !== '') {
			const renderedList = matches.map((match) => {
				const regexHi = new RegExp(term, 'gi');

				const title = (
					<span>
						{match.title.split(regexHi).map((char, index) => (
							<>
								{char}
								{index !== match.title.split(regexHi).length - 1 && (
									<span className="hl">{term}</span>
								)}
							</>
						))}
					</span>
				);
				// const title = match.title.replace(
				//     regexHi,
				//     `<span className="hl">${term}</span>`
				// );
				const description = (
					<span>
						{match.description.split(regexHi).map((char, index) => (
							<>
								{char}
								{index !== match.description.split(regexHi).length - 1 && (
									<span className="hl">{term}</span>
								)}
							</>
						))}
					</span>
				);

				return (
					<Link key={match.id} to={`/streams/${match.id}`}>
						<li>
							<span className="name">
								{title},{description}{' '}
							</span>
						</li>
					</Link>
				);
			});

			return <ul className="suggestions">{renderedList}</ul>;
		}

		return (
			<ul className="suggestions">
				<li>Enter a search term</li>
			</ul>
		);
	};

	render() {
		return (
			<div className="search-wrap">
				<form className="search-form">
					<input
						type="text"
						className="search"
						placeholder="Search.."
						value={this.state.term}
						onChange={this.handleOnChange()}
						onKeyUp={this.handleOnChange()}
					/>
					{this.searchResult(
						this.state.term,
						this.findMatches(this.state.term, this.state.infoItems)
					)}
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	//turn the object into an array
	return {
		streams: Object.values(state.streams),
	};
};

export default connect(mapStateToProps, { fetchStreams })(Search);
