import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Page from './components/Page';
/*
	Made by: GreatGameDota
	https://github.com/GreatGameDota
*/

class App extends Component {
	render () {
		return (
			<Router>
				<Switch>
					<Route exact path='/' render={(routeProps) => <Page {...routeProps} title='Home Page' project={0} />} />
					<Route
						exact
						path='/projects/project1'
						render={(routeProps) => <Page {...routeProps} title='Project1' project={1} />}
					/>
					<Redirect to='/' />
				</Switch>
			</Router>
		);
	}
}

export default App;
