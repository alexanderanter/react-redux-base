import React from 'react';
import SearchResult from './SearchResult';
import './Search.css';
import { connect } from 'react-redux';
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
					<SearchResult
						term={this.state.term}
						matches={this.findMatches(this.state.term, this.state.infoItems)}
					/>
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
