import React from 'react';
import { BrowserRouter, Route,  Switch } from 'react-router-dom';

import Home from '../pages/Home';
import PostDetail from '../pages/PostDetail';
import PageNotFound from '../pages/PageNotFound';

export const SetupRoutes = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/:category" component={Home} />
                <Route exact path="/:category/:id" component={PostDetail} />
                <Route component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default SetupRoutes;