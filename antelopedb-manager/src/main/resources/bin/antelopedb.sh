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

TARGET_FILE=$0

cd $(dirname $TARGET_FILE)
TARGET_FILE=$(basename $TARGET_FILE)

# Iterate down a (possible) chain of symlinks
while [ -L "$TARGET_FILE" ]
do
    TARGET_FILE=$(readlink $TARGET_FILE)
    cd $(dirname $TARGET_FILE)
    TARGET_FILE=$(basename $TARGET_FILE)
done

# Compute the canonicalized name by finding the physical path
# for the directory we're in and appending the target file.
PHYS_DIR=$(pwd -P)

SCRIPT_DIR=$PHYS_DIR
PROGNAME=$(basename "$0")

. "${SCRIPT_DIR}/antelopedb-env.sh"


warn() {
    echo "${PROGNAME}: $*"
}

die() {
    warn "$*"
    exit 1
}

run() {
    ANTELOPEDB_CONF_DIR=${ANTELOPEDB_HOME}/config

    echo
    echo "Java home: ${JAVA_HOME}"
    echo "AntelopeDB home: ${ANTELOPEDB_HOME}"
    echo "AntelopeDB Config File: ${ANTELOPEDB_CONF_DIR}/application.properties"
    echo

    cd ${ANTELOPEDB_HOME}
    ${JAVA_HOME}/bin/java -jar ${ANTELOPEDB_HOME}/lib/quarkus-run.jar
}

main() {
    run "$@"
}


case "$1" in
    start|stop)
        main "$@"
        ;;

    restart)
        run "stop"
        run "start"
        ;;
    *)
        echo "Usage antelopedb {start|stop}"
        ;;
esac
