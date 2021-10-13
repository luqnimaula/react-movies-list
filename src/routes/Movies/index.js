import React, {memo, Suspense, lazy} from "react";
import {Route, Switch} from "react-router-dom";
import FallbackContent from "@app/components/FallbackContent";
import InfoView from "@app/components/InfoView";

export default memo(({match}) => (
	<Suspense fallback={<FallbackContent/>}>
		<InfoView useLoading={false}/>
		<Switch>
	        <Route exact path={`${match.url}`} component={lazy(() => import('./Movies'))}/>
	        <Route path={`${match.url}/:slug`} component={lazy(() => import('./Detail'))}/>
	    </Switch>
    </Suspense>
));