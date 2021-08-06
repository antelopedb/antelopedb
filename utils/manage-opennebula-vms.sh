#!/bin/bash
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
# 
#   http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

help_usage()
{
   # Display Help
   echo "Manage OpenNebula Virtual Machines Helper Script."
   echo
   echo "Syntax: sh manage-opennebula-vms -[h|e|u|p|n|c|m]"
   echo "options:"
   echo "-h|--help     Print this Help."
   echo "-e|--endpoint Opennebula master host url."
   echo "-u|--user     Opennebula user."
   echo "-p|--password Opennebula password."
   echo "-n|--number   Number of VMs to create."
   echo "-c|--cpu      vCPU for each VM."
   echo "-m|--memory   Memory for each VM."
   echo
   exit 0
}

[ $# -eq 0 ] && help_usage
[ ! -x "$(command -v terraform)"  ] && echo "This tool requires terraform installed!" && exit
[ ! -d target  ] && mkdir target

POSITIONAL=()
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    -h|--help)
      help_usage
      ;;
    -e|--endpoint)
      ENDPOINT="$2"
      shift # past argument
      shift # past value
      ;;
    -u|--user)
      USER="$2"
      shift # past argument
      shift # past value
      ;;
    -p|--password)
      PASSWORD="$2"
      shift # past argument
      shift # past value
      ;;
    -n|--number)
      NUMBER="$2"
      shift # past argument
      shift # past value
      ;;
    -c|--cpu)
      CPU="$2"
      shift # past argument
      shift # past value
      ;;
    -m|--memory)
      MEMORY="$2"
      shift # past argument
      shift # past value
      ;;
    *)    # unknown option
      POSITIONAL+=("$1") # save it in an array for later
      echo unknown option && echo $POSITIONAL
      exit 1
      shift # past argument
      ;;
  esac
done

set -- "${POSITIONAL[@]}" # restore positional parameters

echo "OPENNEBULA ENDPOINT= ${ENDPOINT}"
echo "OPENNEBULA USER= ${USER}"
echo "OPENNEBULA PASSWORD= ${PASSWORD}"
echo "VMs NUMBER= ${NUMBER}"
echo "VMs vCPUs= ${CPU}"
echo "VMs MEMORY= ${MEMORY}"

cat << EOF > target/opennebula.tfvars
one_endpoint = "http://$ENDPOINT:2633/RPC2"
one_username = "$USER"
one_password = "$PASSWORD"
EOF

cat << EOF > target/opennebula.tf
terraform {
  required_providers {
    opennebula = {
      source = "OpenNebula/opennebula"
      version = "0.3.0"
    }
  }
}

variable "one_endpoint" {}
variable "one_username" {}
variable "one_password" {}

provider "opennebula" {
  endpoint = var.one_endpoint
  username = var.one_username
  password = var.one_password
}

resource "opennebula_virtual_machine" "demo" {
  count  = $NUMBER
  name   = "mymachinename"
  cpu    = $CPU
  vcpu   = $CPU
  memory = $MEMORY
  template_id = 5
}
EOF

