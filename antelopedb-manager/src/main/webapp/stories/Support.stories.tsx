/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { ComponentProps } from 'react';
import { Support } from '@app/Support/Support';
import { Story } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Support',
  component: Support,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Support>> = (args) => <Support {...args} />;

export const SupportStory = Template.bind({});
SupportStory.args = {
  /*👇 The args you need here will depend on your component */
};
