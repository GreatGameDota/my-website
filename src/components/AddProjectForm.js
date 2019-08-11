import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/AddProjectFormStyles';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class AddProjectForm extends Component {
	state = {
		error: ''
	};

	addProject = (project) => {
		fetch(`http://api.github.com/repos/GreatGameDota/${project.repo}`)
			.then((res) => {
				if (res.ok) {
					res.json();
				} else {
					this.setState({ error: `${res.statusText} - Invalid Repo Name` });
					throw Error(res.statusText);
				}
			})
			.then((result) => {
				if (project.name === '') {
					project.name = result.name;
				}
				project['link'] = result.html_url;
				project['lang'] = result.language;
				project['desc'] = result.description;
				project['homepage'] = result.homepage;
				project['path'] = project.name.toLowerCase().replace(/\s+/g, '-');
				fetch(`http://api.github.com/repos/GreatGameDota/${project.repo}/topics`, {
					headers: { Accept: 'application/vnd.github.mercy-preview+json' }
				})
					.then((res) => res.json())
					.then((result) => {
						project['topics'] = result.names;
						this.props.add(project, 'projects');
					});
			})
			.catch((e) => console.error(`${e} - Invalid Repo Name`));
	};

	render () {
		const { classes } = this.props;
		const initialValues = { name: '', repo: '' };
		return (
			<div className={classes.root}>
				<Formik
					initialValues={initialValues}
					validate={(values) => {
						this.setState({ error: '' });
						let errors = {};
						if (values.name.replace(/ /g, '').length > 20) {
							errors.name = " Name can't be longer than 20 characters";
						}
						if (!values.repo) {
							errors.repo = ' Required';
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						this.addProject(values);
						setSubmitting(false);
						resetForm(initialValues);
					}}
					validateOnBlur={false}
					validateOnChange={false}
				>
					{({ isSubmitting }) => (
						<Form>
							<label htmlFor='name'>Project Name </label>
							<Field type='text' name='name' id='name' placeholder='Name' />
							<span className={classes.error}>
								<ErrorMessage name='name' />
							</span>
							<br />
							<label htmlFor='repo'>Github Repo Name </label>
							<Field type='text' name='repo' id='repo' placeholder='Repo Name' />
							<span className={classes.error}>
								<ErrorMessage name='repo' />
								<span className={classes.error}> {this.state.error}</span>
							</span>
							<br />
							<button type='submit' disabled={isSubmitting}>
								Submit
							</button>
						</Form>
					)}
				</Formik>
			</div>
		);
	}
}

export default withStyles(styles)(AddProjectForm);
