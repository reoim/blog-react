import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';
import _ from 'lodash';

const FIELDS = {
		title: {
			type: 'input',
			label: 'Title for Post'
		},

		categories: {
			type: 'input',
			label: 'Categories'
		},

		content: {
			type: 'textarea',
			label: 'Content'
		}
	};

class PostsNew extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	onSubmit(props) {
		this.props.createPost(props)
			.then(() => {
				// blog post has been created, navigate the user to the index
				// We navigate by calling this.context.router.push with the
				// new path to navigate to
				this.context.router.push('/');
			});
	}

	renderField(fieldConfig, field) {
		const fieldHelper = this.props.fields[field];
		return (
			<div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
					<label>{fieldConfig.label}</label>
					<fieldConfig.type type="text" className="form-control" {...fieldHelper} />
					<div className="text-help">
						{fieldHelper.touched ? fieldHelper.error : ''}
					</div>
				</div>
		);
	}	

	render(){

		const { handleSubmit } = this.props;
		// same as
		// const handleSubmit = this.props. handleSubmit
		// const title = this.props.fields.title
		// const categories = this.props.fields.categories
		// const content = this.props.fields.content

		return(
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create a New Post</h3>
				{_.map(FIELDS, this.renderField.bind(this))}

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	_.each(FIELDS, (type, field) => {
		if(!values[field]){
			errors[field] = `enter a ${field}`;
		}
	});


	return errors;
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
	// name of form does not need to be match with component name
	// but it need to be unique.
	// Especially do not use same name as formReducer
	form: 'PostsNewForm',
	fields: _.keys(FIELDS),
	validate
}, null, { createPost })(PostsNew);
