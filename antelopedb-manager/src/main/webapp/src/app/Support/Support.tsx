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
import { CubesIcon } from '@patternfly/react-icons';
import {
  PageSection,
  Title,
  Button,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateSecondaryActions,
  Spinner, EmptyStateVariant
} from '@patternfly/react-core';
import { AppLogin  } from "@app/AppLogin/AppLogin";
import Cookies from 'js-cookie';

export interface ISupportProps {
  sampleProp?: string;
}

// eslint-disable-next-line prefer-const
let Support: React.FunctionComponent<ISupportProps> = () => {
  const [isLoged, setIsLoged] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onHandleLogin = (value) => {
    setIsLoged(value);
  }

  React.useEffect(() => {
    let value = {};
    value = Cookies.getJSON('jwt-example-cookie');
    if (value) {
      setIsLoged(true);
    } else {
      setIsLoading(true);
      setIsLoged(false);
      location.reload();
    }
  }, []);

  return (
    isLoading ?

      <EmptyState variant={EmptyStateVariant.full}>
        <Spinner/>
      </EmptyState>

      : !isLoged ?

        <AppLogin handleLogin={onHandleLogin}/>

        :

        <PageSection>
          <EmptyState variant={EmptyStateVariant.full}>
            <EmptyStateIcon icon={CubesIcon}/>
            <Title headingLevel="h1" size="lg">
              Empty State (Stub Support Module)
            </Title>
            <EmptyStateBody>
              This represents an the empty state pattern in Patternfly 4. Hopefully it&apos;s simple enough to use but
              flexible
              enough to meet a variety of needs.
            </EmptyStateBody>
            <Button variant="primary">Primary Action</Button>
            <EmptyStateSecondaryActions>
              <Button variant="link">Multiple</Button>
              <Button variant="link">Action Buttons</Button>
              <Button variant="link">Can</Button>
              <Button variant="link">Go here</Button>
              <Button variant="link">In the secondary</Button>
              <Button variant="link">Action area</Button>
            </EmptyStateSecondaryActions>
          </EmptyState>
        </PageSection>
  )
}

export { Support };
