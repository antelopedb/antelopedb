import React from 'react';
import PropTypes from 'prop-types';
import {EmptyStateIcon} from "@patternfly/react-core";
import { ProcessAutomationIcon } from '@patternfly/react-icons'
import {getAccessToken} from "@app/utils/fetchUtils";

const propTypes = {
  onClose: PropTypes.func.isRequired
};

/*
 We send the POST to the backend for creating the datalake here.
 */
export class FinishedStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clusterName: props.clusterName,
      clusterHosts: props.clusterHosts,
      clusterRepo: props.clusterRepo,
      clusterAgents: props.clusterAgents,
      percent: 0
    };
  }

  private closeAndChange = () => {
    // for raising the final method when the wizard end.
    this.props.onSave();
    // for handling the conditional rendering in datalakes page.
    this.props.hlState();
  };

  private sendPOST = () => {
    console.log("POST: ", JSON.stringify(this.state));
    fetch('http://localhost:8000/clusters', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "name": this.state.name
      })
    }).then(res => res.json())
      .then(res => console.log(res))
  };

  private tick = () => {
    if (this.state.percent < 100) {
      this.setState(prevState => ({
        percent: prevState.percent + 20
      }));
    }
    // FIXME: we send the POST at 50% of tick
    if (this.state.percent === 40 ) {
      this.sendPOST();
    }
  };

  private componentDidMount = () => {
    this.interval = setInterval(() => this.tick(), 250);
  };

  private componentWillUnmount = () => {
    clearInterval(this.interval);
  };


  public render = () => {
    const { percent } = this.state;
    return (
      <div className="pf-l-bullseye">
        <div className="pf-c-empty-state pf-m-lg">
          <i className="fas fa- fa-cogs pf-c-empty-state__icon" aria-hidden="true" />
          <EmptyStateIcon icon={ProcessAutomationIcon} />
          <h1 className="pf-c-title pf-m-lg">
            {percent === 100 ? 'Datalake Configuration Complete' : 'Datalake Configuration in progress'}
          </h1>
          <div className="pf-c-empty-state__body">
            <div className="pf-c-progress pf-m-singleline" id="progress-singleline-example">
              <div className="pf-c-progress__description" id="progress-singleline-example-description" />
              <div className="pf-c-progress__status" aria-hidden="true">
                <span className="pf-c-progress__measure">{percent}%</span>
              </div>
              <div
                className="pf-c-progress__bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={percent}
                aria-describedby="progress-singleline-example-description"
              >
                <div
                  className="pf-c-progress__indicator"
                  style={{
                    width: `${percent}%`
                  }}
                />
              </div>
            </div>
          </div>

          <div className="pf-c-empty-state__body">
            The complete deployment of this Datalake might took a few minutes, please
            track the progress in the Datalakes section.
          </div>

          <div className="pf-c-empty-state__secondary">
            <button
              className={percent === 100 ? 'pf-c-button pf-m-primary' : 'pf-c-button pf-m-link'}
              onClick={this.closeAndChange}
            >
              {percent === 100 ? 'Show Datalakes' : 'Cancel'}
            </button>
          </div>

        </div>

      </div>
    );
  };
}

FinishedStep.propTypes = propTypes;

export default FinishedStep;
