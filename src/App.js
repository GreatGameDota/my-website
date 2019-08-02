import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './components/HomePage';
/*
	Made by: GreatGameDota
	https://github.com/GreatGameDota
*/

class App extends Component {
	render () {
		return (
			<Router>
				<Switch>
					<Route exact path='/' render={(routeProps) => <HomePage {...routeProps} />} />
					<Redirect to='/' />
				</Switch>
			</Router>
		);
	}
}

export default App;
