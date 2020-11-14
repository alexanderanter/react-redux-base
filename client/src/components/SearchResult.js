import React from 'react';
import { Link } from 'react-router-dom';

const SearchResult = ({ matches, term }) => {
	if (term !== '') {
		const renderedList = matches.map((match) => {
			const regexHi = new RegExp(term, 'gi');
			const matchTitle = match.title.replace(regexHi, term);
			const matchDescription = match.description.replace(regexHi, term);
			return (
				<Link key={match.id} to={`/streams/${match.id}`}>
					<li>
						<span className="name">
							<span className="hl">{matchTitle}</span> ,{' '}
							<span className="hl">{matchDescription}</span>
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

export default SearchResult;
