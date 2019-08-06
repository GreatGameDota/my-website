import React, { Component } from 'react';
import Firebase from 'firebase';
import config from './dbConfig';

export default class Database extends Component {
	state = config.reset;

	constructor (props) {
		super(props);
		Firebase.initializeApp(config);
	}

	componentDidMount () {
		this.getData();
	}

	componentDidUpdate (prevProps, prevState) {
		if (prevState !== this.state) {
			this.writeData();
		}
	}

	writeData = () => {
		Firebase.database().ref('/').set(this.state);
	};

	getData = () => {
		let ref = Firebase.database().ref('/');
		ref.on('value', (snapshot) => {
			const state = snapshot.val();
			this.setState(state);
		});
	};

	addData = (data, model) => {
		data = { uid: new Date().getTime().toString(), name: 'test name' };
		Firebase.database().ref('/').child(model).set([ ...this.state[model], data ]);
		// data = { uid: new Date().getTime().toString(), path: '/projects/project1', name: 'Project1' };
		// Firebase.database().ref('/').child('projects').set([ ...this.state['projects'], data ]);
	};

	removeData = (newData, model) => {
		newData = this.state[model][0];
		const newArr = this.state[model].filter((data) => {
			return data.uid !== newData.uid;
		});
		let newState = {};
		newState[model] = newArr;
		this.setState(newState);
	};

	updateData = (newData, model) => {
		newData = { uid: '1565049730183', name: 'test update name' };
		const devIndex = this.state[model].findIndex((data) => {
			return data.uid === newData.uid;
		});
		if (devIndex > -1) {
			Firebase.database().ref('/').child(model).child(devIndex.toString()).set(newData);
		} else {
			console.log('No item with that id');
		}
	};

	render () {
		const children = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, {
				db: this.state,
				addData: this.addData,
				removeData: this.removeData
			});
		});
		return <div>{children}</div>;
	}
}
