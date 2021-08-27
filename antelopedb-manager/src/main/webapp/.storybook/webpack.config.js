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
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const appConfig = require('../webpack.common');
const { stylePaths } = require("../stylePaths");

module.exports = ({ config, mode }) => {
  config.module.rules = [];
  config.module.rules.push(...appConfig(mode).module.rules);
  config.module.rules.push({
    test: /\.css$/,
    include: [
      path.resolve(__dirname, '../node_modules/@storybook'),
      ...stylePaths
    ],
    use: ["style-loader", "css-loader"]
  });
  config.module.rules.push({
    test: /\.tsx?$/,
    include: path.resolve(__dirname, '../src'),
    use: [
      require.resolve('react-docgen-typescript-loader'),
    ],
  })
  config.resolve.plugins = [
    new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, "../tsconfig.json")
    })
  ];
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
