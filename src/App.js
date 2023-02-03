import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Contact from './pages/Contact/Contact';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import News from './pages/News/News';
import Register from './pages/Register/Register';
import { HomeTemplate } from './templates/HomeTemplates/HomeTemplate';
import { history } from './util/history';

export default function App() {
	return (
		<Router history={history}>
			<Switch>
				<HomeTemplate exact path='/home' Component={Home} />
				<HomeTemplate exact path='/contact' Component={Contact} />
				<HomeTemplate exact path='/news' Component={News} />
				<HomeTemplate exact path='/detail/:id' Component={Detail} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<HomeTemplate exact path='/' Component={Home} />
			</Switch>
		</Router>
	);
}
