import React from 'react';
import './Search.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../actions';

class Search extends React.Component {
	state = { term: '', infoItems: [] };
	componentDidMount() {
		this.props.fetchStreams('streams').then(() => {
			this.setState({ infoItems: Object.values(this.props.streams) });
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
	searchResult = (term, matches) =>
		matches.map((match) => {
			const regexHi = new RegExp(term, 'gi');

			const title = (
				<span>
					{match.title.split(regexHi).map((char, index) => (
						<React.Fragment key={index}>
							{char}
							{index !== match.title.split(regexHi).length - 1 && (
								<span className="hl">{term}</span>
							)}
						</React.Fragment>
					))}
				</span>
			);
			//const title = match.title.replace(regexHi,`<span className="hl">${term}</span>`);
			const description = (
				<span>
					{match.description.split(regexHi).map((char, index) => (
						<React.Fragment key={index}>
							{char}
							{index !== match.description.split(regexHi).length - 1 && (
								<span className="hl">{term}</span>
							)}
						</React.Fragment>
					))}
				</span>
			);

			return (
				<Link key={match.id} to={`/streams/${match.id}`}>
					<li>
						<span className="name search-title truncate">
							{title} - {description}{' '}
						</span>
					</li>
				</Link>
			);
		});
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
					<ul className="suggestions">
						{this.state.term ? (
							<>
								{this.searchResult(
									this.state.term,
									this.findMatches(this.state.term, this.state.infoItems)
								)}
							</>
						) : (
							<li>Enter a search term</li>
						)}
					</ul>
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
