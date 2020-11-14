import React from 'react';
import { Link } from 'react-router-dom';

const SearchResult = ({ matches, term }) => {
	if (term !== '') {
		const renderedList = matches.map((match) => {
			return (
				<Link key={match.id} to={`/streams/${match.id}`}>
					<li>
						<span className="name">
							<span>{match.title}</span> , <span>{match.description}</span>
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
