import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../../shared/history';

import HomeView from '../Home/';
import LessonsView from '../Lessons/';
import LessonView from '../Lesson/';
import LoginView from '../Login/';
import NewUserView from '../Newuser/';
import ChangePasswordView from '../ChangePassword/';
import RouteAuth from '../RouteAuth/';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../theme/';

import { AppRoutes } from '../../_common/';

import { LocalizeProvider } from 'react-localize-redux';
import store from '../../store';

import { AppRouterPropsI } from './container';

const Root: React.StatelessComponent<AppRouterPropsI> = props => {
    const { lessons, login, newuser, changePassword } = AppRoutes;
    const { authorized } = props;

    return (
        <MuiThemeProvider {...{ theme }}>
            <LocalizeProvider {...{ store }} >
                <Router {...{ history }}>
                    <Route path="/">
                    <HomeView>
                            <Switch>
                                <Route exact path={`${lessons}`} component={LessonsView} />
                                <Route path={`${lessons}/:id`} component={LessonView} />
                                <Route path={`${login}`} component={LoginView} />
                                <Route path={`${newuser}`} component={NewUserView} />
                                <RouteAuth path={`${ changePassword }`} component={ ChangePasswordView } condition={ authorized } />
                            </Switch>
                    </HomeView>
                    </Route>
                </Router>
            </LocalizeProvider>
        </MuiThemeProvider>
    );
};

export default Root;
