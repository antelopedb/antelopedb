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
import {EmptyState, EmptyStateVariant, PageSection, Spinner, Title} from '@patternfly/react-core';
import { AppLogin  } from "@app/AppLogin/AppLogin";
import Cookies from 'js-cookie';
import { ClusterWizard } from "@app/Dashboard/ClusterWizard";
import { getAccessToken } from "@app/utils/fetchUtils";

const UserDashboard: React.FunctionComponent = () => {
  const [isLoged, setIsLoged] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isClusters, setIsClusters] = React.useState(false);
  const [data, setData] = React.useState([]);

  const onHandleLogin = (value) => {
    setIsLoged(value);
  }

  /*
    This function will change the state of the component, so the render method is
    raised. We have to pass out the reference to this method to the final
    step in the wizard, so the page is re-rendered when is not the first
    empty state.
  */
  const onIsClusters = () => {
    setIsClusters(true);
  };

  const onIsLoading = () => {
    setIsLoading(false);
  };

  const onHandleData = (newData) => {
    setData(oldData => [...oldData, newData]);
  };

  React.useEffect(() => {
    fetch(`http://localhost:8000/clusters`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`,
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          const isEmpty = JSON.stringify(result) === JSON.stringify([]);
          if (!isEmpty) {
            onIsClusters();
            onIsLoading();
            setData(result);
          }
          onIsLoading();
          let value = {};
          value = Cookies.getJSON('jwt-example-cookie');
          if (value) {
            setIsLoged(true);
          } else {
            setIsLoading(true);
            setIsLoged(false);
            location.reload();
          }
        }
      )
  }, []);

  return (
    /*
      Unknown state, the page is loading.
     */
    isLoading?
      <EmptyState variant={EmptyStateVariant.full}>
        <Spinner/>
      </EmptyState>
    /*
      The user is not loged in.
     */
    : !isLoged?
      <AppLogin handleLogin={onHandleLogin}/>
    :
      <PageSection>
        <Title headingLevel="h1" size="lg">User Dashboard Page Title!</Title>
      </PageSection>
  )
}

export { UserDashboard };
