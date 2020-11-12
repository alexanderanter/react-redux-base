import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}
	render() {
		if (!this.props.stream) {
			return (
				<>
					<h2>Loading...</h2>
				</>
			);
		} else {
			return (
				<>
					<h2>Title: {this.props.stream.title}</h2>
					<p>Description: {this.props.stream.description}</p>
				</>
			);
		}
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
	};
};
export default connect(mapStateToProps, { fetchStream })(StreamShow);
