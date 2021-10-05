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
import React from 'react';
import { Button, Wizard } from '@patternfly/react-core';
import {StepClusterBasics} from "@app/Dashboard/WizardSteps/StepClusterBasics";
import {StepSpecifyEnvironment} from "@app/Dashboard/WizardSteps/StepSpecifyEnvironment";
import {StepSpecifyHosts} from "@app/Dashboard/WizardSteps/StepSpecifyHosts";
import {StepSelectRepository} from "@app/Dashboard/WizardSteps/StepSelectRepository";
import {StepInstallAgents} from "@app/Dashboard/WizardSteps/StepInstallAgents";
import {StepReview} from "@app/Dashboard/WizardSteps/StepReview";
import FinishedStep from "@app/Dashboard/WizardSteps/FinishedStep";

class ClusterWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.toggleOpen = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };

    this.onSave = () => {
      console.log("onSave");
      this.setState({
        step: 1,
        isOpen: false,
      });
      const value = {
        clusterName: this.state.clusterName,
        clusterEnv: this.state.clusterEnv,
        clusterHosts: this.state.clusterHosts,
        clusterRepo: this.state.clusterRepo,
        clusterAgents: this.state.clusterAgents
      };
      console.log("ClusterWizard-> onSave: ", value);
      // stringify convert JavaScript object to JSON string.
      // parse convert JSON string to JSON object.
      this.props.handleData(JSON.parse(JSON.stringify(value)));
    };

    this.handleModalToggle = () => {
      this.setState(({isOpen}) => ({
        isOpen: !isOpen
      }));
    };

    this.handleClusterName = (state) => {
      this.setState({
        clusterName: state.clusterName
      })
    };

    this.handleEnvironment = (state) => {
      this.setState({
        clusterEnvironment: state.clusterEnvironment
      })
    };

    this.handleHosts = (state) => {
      this.setState({
        clusterHosts: state.clusterHosts
      })
    };

    this.handleRespository = (state) => {
      this.setState({
        clusterRepository: state.clusterRepository
      })
    };

    this.handleAgents = (state) => {
      this.setState({
        clusterAgents: state.clusterAgents
      })
    };
  }

    render()
    {
      const {
        isOpen,
        clusterName,
        clusterEnv,
        clusterHosts,
        clusterRepo,
        clusterAgents
      } = this.state;

      const steps = [
        {
          name: 'Cluster Basics',
          component: <StepClusterBasics changeMainStateDatalake={this.handleClusterName}/>
        },
        {
          name: 'Specify Environment',
          component: <StepSpecifyEnvironment changeMainStateDatalake={this.handleEnvironment}/>
        },
        {
          name: 'Specify Hosts',
          component: <StepSpecifyHosts changeMainStateDatalake={this.handleHosts}/>
        },
        {
          name: 'Select Repository',
          component: <StepSelectRepository changeMainStateDatalake={this.handleRespository}/>
        },
        {
          name: 'Install Agents',
          component: <StepInstallAgents changeMainStateDatalake={this.handleAgents}/>
        },
        {
          name: 'Inspect Cluster',
          component: <StepReview/>, nextButtonText: 'Finish'
        },
        {
          name: 'Finish',
          component: <FinishedStep
            onClose={this.toggleOpen}
            onSave={this.onSave}
            clusterName={clusterName}
            clusterEnv={clusterEnv}
            clusterHosts={clusterHosts}
            clusterRepo={clusterRepo}
            clusterAgents={clusterAgents}
            hlState={this.props.handleState}/>,
          isFinishedStep: true
        }
      ];

      const title = 'New Cluster';

      return (
        <React.Fragment>
          <Button variant="primary" onClick={this.handleModalToggle}>
            Create New Cluster
          </Button>
          <Wizard
            title={title}
            description="AntelopeDB new cluster step by step assistant"
            steps={steps}
            onClose={this.handleModalToggle}
            isOpen={isOpen}
          />
        </React.Fragment>
      );
    }
  }

export { ClusterWizard }
