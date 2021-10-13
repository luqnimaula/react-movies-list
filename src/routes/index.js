import React, {memo, Suspense, lazy} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import FallbackContent from "@app/components/FallbackContent";

export default memo(({match}) =>
{
    return (
        <Suspense fallback={<FallbackContent/>}>
            <Switch>
                <Route path={`${match.url}movies`} component={lazy(() => import('./Movies'))}/>
                <Redirect to="/movies"/>
            </Switch>
        </Suspense>
    );
});