import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}
	onSubmit = (formValues) => {
		this.props.editStream(this.props.match.params.id, formValues);
		console.log(formValues);
	};
	render() {
		if (!this.props.stream) {
			return <div> Loading... </div>;
		}
		return (
			<div>
				<StreamForm
					onSubmit={this.onSubmit}
					initialValues={_.pick(this.props.stream, 'title', 'description')}

					//lodash pick function same as:
					// initialValues={{
					// 	title: this.props.stream.title,
					// 	description: this.props.stream.description,
					// }}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
	};
};
export default connect(mapStateToProps, { fetchStream, editStream })(
	StreamEdit
);
