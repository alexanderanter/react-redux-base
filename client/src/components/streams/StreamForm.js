import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
	//connect the input from formProps from redux-form with renderInput attributes and eventhandlers
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, placeholder, required, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} placeholder={placeholder} required={required} />
				<div>{this.renderError(meta)}</div>
			</div>
		);
	};

	onSubmit = (formValues) => {
		//callback to parent component
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<form
				onSubmit={this.props.handleSubmit(this.onSubmit)}
				className="ui form error"
			>
				<Field
					name="title"
					type="text"
					label="Enter Title"
					placeholder="Enter Title"
					required={true}
					component={this.renderInput}
				/>
				<Field
					name="description"
					type="text"
					label="Enter Description"
					placeholder="Enter a description"
					required={true}
					component={this.renderInput}
				/>
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

const validate = (formValues) => {
	const errors = {};

	if (!formValues.title) {
		errors.title = 'Enter a title';
	}
	if (!formValues.description) {
		errors.description = 'Enter a description';
	}
	return errors;
};
export default reduxForm({
	form: 'streamForm',
	validate,
})(StreamForm);
