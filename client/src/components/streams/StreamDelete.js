import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { Link } from 'react-router-dom';
import { deleteStream, fetchStream } from '../../actions';
import { connect } from 'react-redux';

class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream('/streams', this.props.match.params.id);
	}
	onDeleteClick = () => {
		this.props.deleteStream('/streams', this.props.match.params.id);
	};
	renderActions() {
		return (
			<>
				<button onClick={this.onDeleteClick} className="ui button primary">
					Delete
				</button>
				<Link to="/" className="ui button">
					Cancel
				</Link>
			</>
		);
	}
	renderContent() {
		if (!this.props.stream) {
			return (
				<>
					<h2>Are you sure you want to delete this stream?</h2>
				</>
			);
		} else {
			return (
				<>
					<h2>Are you sure you want to delete this stream?</h2>
					<p>Title: {this.props.stream.title}</p>
					<p>Description: {this.props.stream.description}</p>
				</>
			);
		}
	}

	render() {
		return (
			<Modal
				title="Delete Stream"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push('/')}
			/>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
	};
};
export default connect(mapStateToProps, { deleteStream, fetchStream })(
	StreamDelete
);
