#!/bin/bash
#
#    Licensed to the Apache Software Foundation (ASF) under one or more
#    contributor license agreements.  See the NOTICE file distributed with
#    this work for additional information regarding copyright ownership.
#    The ASF licenses this file to You under the Apache License, Version 2.0
#    (the "License"); you may not use this file except in compliance with
#    the License.  You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.


# The default java implementation to use.
JAVA_HOME=${JAVA_HOME:=/usr/lib/jvm/java-1.8.0}
ANTELOPEDB_HOME=${ANTELOPEDB_HOME:=$PWD/..}
#The directory for the AntelopeDB pid file
ANTELOPEDB_PID_DIR=${ANTELOPEDB_PID_DIR:=$ANTELOPEDB_HOME/run}
#The directory for AntelopeDB log files
ANTELOPEDB_LOG_DIR=${ANTELOPEDB_LOG_DIR:=$ANTELOPEDB_HOME/logs}

export JAVA_HOME ANTELOPEDB_HOME ANTELOPEDB_PID_DIR ANTELOPEDB_LOG_DIR
