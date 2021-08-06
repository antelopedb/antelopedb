# Packaging

## Apache Kudu Build

General steps for building Apache Kudu main branch in CentOS 7.x

```text
sudo yum -y install autoconf automake curl cyrus-sasl-devel cyrus-sasl-gssapi \
  cyrus-sasl-plain flex gcc gcc-c++ gdb git java-1.8.0-openjdk-devel \
  krb5-server krb5-workstation libtool make openssl-devel patch pkgconfig \
  redhat-lsb-core rsync unzip vim-common which vim tree

sudo yum -y install centos-release-scl-rh
sudo yum -y install devtoolset-8

git clone https://github.com/apache/kudu

cd kudu

build-support/enable_devtoolset.sh thirdparty/build-if-necessary.sh
mkdir -p build/release
cd build/release

../../build-support/enable_devtoolset.sh \
  ../../thirdparty/installed/common/bin/cmake \
  -DCMAKE_BUILD_TYPE=release \
  ../..
make -j1

sudo mkdir /opt/kudu && sudo chown -R vagrant: /opt/kudu

make DESTDIR=/opt/kudu install
```

## Apache Impala Build

General steps for building Apache Impala main branch in CentOS 7.x

```text
git clone https://github.com/apache/impala.git
pushd /home/vagrant/build/impala/
export IMPALA_HOME=`pwd`
./bin/bootstrap_system.sh

source ./bin/impala-config.sh
./buildall.sh -noclean -notests
```

## Final localtion general layout

```text
/opt/antelope/kudu/  
├── bin                                                                      
│   └── kudu                         
├── conf
│   ├── master.gflagfile
│   └── tserver.gflagfile
├── lib64
│   ├── libkudu_client.so.0 -> libkudu_client.so.0.1.0
│   └── libkudu_client.so.0.1.0
├── sbin
│   ├── kudu-master
│   └── kudu-tserver
├── systemd
│   ├── kudu-master.service
│   └── kudu-tserver.service
└── www

/opt/antelope/impala/
├── bin
│   └── shell
├── conf
│   ├── admission.gflagfile
│   ├── catalog.gflagfile
│   ├── impala.env
│   ├── impala.gflagfile
│   └── statestore.gflagfile
├── lib
├── lib64
│   ├── libgcc_s.so.1
│   ├── libkudu_client.so.0 -> libkudu_client.so.0.1.0
│   ├── libkudu_client.so.0.1.0
│   ├── libstdc++.so.6 -> libstdc++.so.6.0.24
│   └── libstdc++.so.6.0.24
├── sbin
│   ├── admissiond -> impalad
│   ├── catalogd -> impalad
│   ├── impalad
│   └── statestored -> impalad
├── systemd
│   ├── impala-admission.service
│   ├── impala-catalog.service
│   ├── impala.service
│   └── impala-statestore.service
└── www

/opt/antelope/hive
└── systemd
    └── metastore.service

/opt/antelope/hadoop
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

