# AntelopeDB Utils scripts

## Opennebula Terraform Utils Scripts

### Installing Terraform in Fedora

```
sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --add-repo https://rpm.releases.hashicorp.com/fedora/hashicorp.repo
sudo dnf -y install terraform
```

### Manage OpenNebula VMs Script usage

Getting usage help:

```
sh manage-opennebula-vms.sh --help
```
Example session:

```
sh manage-opennebula-vms.sh -e master.domain.com -u theuser -p thepassword -n 2 -c 2 -m 2048 -t vmhostname
cd target
terraform init
terraform validate
terraform apply
```
---
<sub>
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

<sub>
  http://www.apache.org/licenses/LICENSE-2.0

<sub>
Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.

