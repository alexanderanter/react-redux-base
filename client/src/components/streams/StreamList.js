import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
	componentDidMount() {
		this.props.fetchStreams('/streams');
	}

	renderAdmin(stream) {
		if (stream.userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<Link to={`/streams/edit/${stream.id}`} className="ui button primary">
						EDIT{' '}
					</Link>
					<Link
						className="ui button negative"
						to={`/streams/delete/${stream.id}`}
					>
						DELETE
					</Link>
				</div>
			);
		}
	}

	renderStreamList() {
		return this.props.streams.map((stream) => {
			return (
				<div className="item" key={stream.id}>
					{this.renderAdmin(stream)}
					<i className="large middle aligned icon camera" />
					<div className="content">
						<Link className="header" to={`/streams/${stream.id}`}>
							{stream.title}
						</Link>
						<div className="description">{stream.description}</div>
					</div>
				</div>
			);
		});
	}
	renderCreate() {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right', paddingTop: '20px' }}>
					<Link to="/streams/new" className="item ui button green">
						Create a new stream
					</Link>
				</div>
			);
		}
	}
	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">{this.renderStreamList()}</div>
				{this.renderCreate()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	//turn the object into an array
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn,
	};
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
