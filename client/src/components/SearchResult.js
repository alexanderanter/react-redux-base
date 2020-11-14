import React from 'react';
import { Link } from 'react-router-dom';

const SearchResult = ({ matches, term }) => {
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

export default SearchResult;
