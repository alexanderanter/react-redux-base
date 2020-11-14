import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
	return (
		<div className="ui secondary pointing menu ">
			<Link to="/" className="item primary ui red google button">
				Search
			</Link>
			<div className="right menu ">
				<Link to="/streams" className="item">
					All Items
				</Link>
				<GoogleAuth />
			</div>
		</div>
	);
};

export default Header;
