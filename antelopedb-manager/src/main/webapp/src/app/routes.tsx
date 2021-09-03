/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { accessibleRouteChangeHandler } from '@app/utils/utils';
import { Dashboard } from '@app/Dashboard/Dashboard';
import { Support } from '@app/Support/Support';
import { NotFound } from '@app/NotFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';
import Cookies from 'js-cookie';
import {EnvironmentsDeployments} from "@app/Deployments/Environments/EnvironmentsDeployments";
import {ClustersDeployments} from "@app/Deployments/Clusters/ClustersDeployments";
import {Audit} from "@app/Audit/Audit";
import {Logs} from "@app/Logs/Logs";
import {Users} from "@app/Users/Users";
import {BackupsOperations} from "@app/Operations/Backups/BackupsOperations";
import {ServicesOperations} from "@app/Operations/Services/ServicesOperations";
import {PipelinesOperations} from "@app/Operations/Pipelines/PipelinesOperations";
import {QueriesOperations} from "@app/Operations/Queries/QueriesOperations";
import {DatabasesOperations} from "@app/Operations/Databases/DatabasesOperations";

let routeFocusTimer: number;

export interface IAppRoute {
  label?: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path: string;
  title: string;
  isAsync?: boolean;
  routes?: undefined;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;
let routes: AppRouteConfig[] = [];

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

const generateRoutes = () => {
  let role;
  /*
    FIXME:
    Whe the cookie is removed manually, this function
    is executed and raised one error. This function is
    execute on each rendering of the routes.
   */
  try {
    role = parseJwt(Cookies.getJSON('jwt-example-cookie').access_token);
  } catch(err) {
    role = {"role":"null" };
  }

  let theroutes: AppRouteConfig = [];

  if (role.role === "admin") {
    theroutes = [
      {
        component: Dashboard,
        exact: true,
        label: 'Dashboard',
        path: '/',
        title: 'AntelopeDB Platform | Main Dashboard',
      },
      {
        label: 'Deployments',
        routes: [
          {
            component: ClustersDeployments,
            exact: true,
            label: 'Clusters',
            path: '/deployments/clusters',
            title: 'AntelopeDB Platform | Clusters Deployments',
          },
          {
            component: EnvironmentsDeployments,
            exact: true,
            label: 'Deployments',
            path: '/deployments/environments',
            title: 'AntelopeDB Platform | Environments Deployments',
          }
        ]
      },
      {
        label: 'Operations',
        routes: [
          {
            component: BackupsOperations,
            exact: true,
            label: 'Backups',
            path: '/operations/backups',
            title: 'AntelopeDB Platform | Backups Operations',
          },
          {
            component: ServicesOperations,
            exact: true,
            label: 'Services',
            path: '/operations/services',
            title: 'AntelopeDB Platform | Services Operations',
          },
          {
            component: PipelinesOperations,
            exact: true,
            label: 'Pipelines',
            path: '/operations/pipelines',
            title: 'AntelopeDB Platform| Pipeline Operations',
          },
          {
            component: QueriesOperations,
            exact: true,
            label: 'Queries',
            path: '/operations/queries',
            title: 'AntelopeDB Platform | Queries Operations',
          },
          {
            component: DatabasesOperations,
            exact: true,
            label: 'Databases',
            path: '/operations/databases',
            title: 'AntelopeDB Platform | Databases Operations',
          }
        ]
      },
      {
        component: Users,
        exact: true,
        isAsync: true,
        label: 'Users',
        path: '/users',
        title: 'AntelopeDB Platform | Users Page',
      },
      {
        component: Logs,
        exact: true,
        isAsync: true,
        label: 'Logs',
        path: '/logs',
        title: 'AntelopeDB Platform | Logs Page',
      },
      {
        component: Audit,
        exact: true,
        isAsync: true,
        label: 'Audit',
        path: '/audit',
        title: 'AntelopeDB Platform | Audit Page',
      }
   ]
  } else {
    theroutes = [
      {
        component: Dashboard,
        exact: true,
        label: 'Dashboard',
        path: '/',
        title: 'Main Dashboard Title'
      },
      {
        component: Support,
        exact: true,
        isAsync: true,
        label: 'Support',
        path: '/support',
        title: 'Support Page Title'
      }
    ];
  }
  routes = theroutes;
  return theroutes;
}

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
const useA11yRouteChange = (isAsync: boolean) => {
  const lastNavigation = useLastLocation();
  React.useEffect(() => {
    if (!isAsync && lastNavigation !== null) {
      routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      clearTimeout(routeFocusTimer);
    };
  }, [isAsync, lastNavigation]);
}


const RouteWithTitleUpdates = ({ component: Component, isAsync = false, title, ...rest }: IAppRoute) => {
  useA11yRouteChange(isAsync);
  useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <Component {...rest} {...routeProps} />;
  }

  return <Route render={routeWithTitle} {...rest}/>;
};

const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const AppRoutes = () => (
  <LastLocationProvider>
    <Switch>
      {
        generateRoutes().reduce((flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
          [] as IAppRoute[]).map(({ path, exact, component, title, isAsync }, idx) => (
          <RouteWithTitleUpdates
            path={path}
            exact={exact}
            component={component}
            key={idx}
            title={title}
            isAsync={isAsync}
          />
        ))
      }
      <PageNotFound title="404 Page Not Found"/>
    </Switch>
  </LastLocationProvider>
);

export { AppRoutes, generateRoutes };
