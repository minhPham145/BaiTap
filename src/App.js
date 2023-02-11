import React from 'react';
import { Router, Switch } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

import AddNew from './pages/Admin/Films/AddNew/AddNew';
import Edit from './pages/Admin/Films/Edit/Edit';
import Films from './pages/Admin/Films/Films';
import Showtime from './pages/Admin/Showtime/Showtime';
import AddUser from './pages/Admin/Users/AddUser/AddUser';
import EditUser from './pages/Admin/Users/EditUser/EditUser';
import Users from './pages/Admin/Users/Users';

import Checkout from './pages/Checkout/Checkout';
import Contact from './pages/Contact/Contact';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import News from './pages/News/News';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import { AdminTemplates } from './templates/AdminTemplates/AdminTemplates';
import { CheckoutTemplate } from './templates/CheckoutTemplates/CheckoutTemplate';
import { HomeTemplate } from './templates/HomeTemplates/HomeTemplate';
import { UserTemplate } from './templates/UserTemplates/UserTemplate';
import { history } from './util/history';

export default function App() {
	return (
		<Router history={history}>
			<Loading />
			<ScrollToTop />
			<Switch>
				<HomeTemplate exact path='/home' Component={Home} />
				<HomeTemplate exact path='/contact' Component={Contact} />
				<HomeTemplate exact path='/news' Component={News} />
				<HomeTemplate exact path='/detail/:id' Component={Detail} />
				<HomeTemplate exact path='/profile' Component={Profile} />

				<CheckoutTemplate exact path='/checkout/:id' Component={Checkout} />

				<UserTemplate exact path='/login' Component={Login} />
				<UserTemplate exact path='/register' Component={Register} />

				<AdminTemplates exact path='/admin' Component={Films} />
				<AdminTemplates exact path='/admin/films' Component={Films} />
				<AdminTemplates exact path='/admin/films/addnew' Component={AddNew} />
				<AdminTemplates exact path='/admin/films/edit/:id' Component={Edit} />
				<AdminTemplates exact path='/admin/films/showtime/:id/:tenphim' Component={Showtime} />

				<AdminTemplates exact path='/admin/users' Component={Users} />
				<AdminTemplates exact path='/admin/users/adduser' Component={AddUser} />
				<AdminTemplates exact path='/admin/users/edituser/:id' Component={EditUser} />

				<HomeTemplate exact path='/' Component={Home} />
			</Switch>
		</Router>
	);
}
