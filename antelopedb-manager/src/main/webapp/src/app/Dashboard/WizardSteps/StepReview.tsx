import React from 'react';
import {
  Form,
  FormGroup,
  TextInput,
} from '@patternfly/react-core';

class StepReview extends React.Component {
  private handleTextInputChange1: (value1) => void;
  private handleTextInputChange2: (value2) => void;

  constructor(props) {
    super(props);

    this.state = {
      value1: '',
      value2: '',
    };

    this.handleTextInputChange1 = value1 => {
      this.setState({ value1 });
    };

    this.handleTextInputChange2 = value2 => {
      this.setState({ value2 });
    };

  }

  public render() {
    const { value1, value2 } = this.state;
    return (
      <Form>
        <FormGroup
          label="Step Review"
          isRequired
          fieldId="datalake-name"
          helperText="Please provide the Datalake name for using in Projects"
        >
          <TextInput
            isRequired
            type="text"
            id="simple-form-name"
            name="simple-form-name"
            aria-describedby="simple-form-name-helper"
            value={value1}
            onChange={this.handleTextInputChange1}
          />
        </FormGroup>
        <FormGroup label="Description:" fieldId="simple-form-note">
          <TextInput
            type="text"
            id="simple-form-note"
            name="simple-form-number"
            value={value2}
            onChange={this.handleTextInputChange2}
          />
        </FormGroup>
      </Form>
    );
  }
}

export { StepReview }
