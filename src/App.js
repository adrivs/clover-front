import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//Components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile-view/Profile';
import Events from './components/events/Events';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from './utils/setAuthToken';

import { loadUser } from './actions/auth';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path='/' component={Landing} />
                    <Alert />
                    <section>
                        <Switch>
                            <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            <Route exact path='/login' component={Login} />
                            <PrivateRoute
                                exact
                                path='/profiles'
                                component={Profiles}
                            />
                            <PrivateRoute
                                exact
                                path='/profile/:id'
                                component={Profile}
                            />
                            <PrivateRoute
                                exact
                                path='/dashboard'
                                component={Dashboard}
                            />
                            <PrivateRoute
                                exact
                                path='/create-profile'
                                component={CreateProfile}
                            />
                            <PrivateRoute
                                exact
                                path='/edit-profile'
                                component={EditProfile}
                            />
                            <PrivateRoute
                                exact
                                path='/events'
                                component={Events}
                            />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};
export default App;
