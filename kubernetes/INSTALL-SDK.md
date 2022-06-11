# Custom settings

```
export BINPATH="$HOME/.local/bin
export SDKVERSION=v1.21.0
```

# Change above custom settings

## Getting architecture/os target platform

```
export ARCH=$(case $(uname -m) in x86_64) echo -n amd64 ;; aarch64) echo -n arm64 ;; *) echo -n $(uname -m) ;; esac)
export OS=$(uname | awk '{print tolower($0)}')
```

## Download the binary for your platform

```
export OPERATOR_SDK_DL_URL=https://github.com/operator-framework/operator-sdk/releases/download/$SDKVERSION
```

## Verify the downloaded binary

### Import the operator-sdk release GPG key from keyserver.ubuntu.com

```
gpg --keyserver keyserver.ubuntu.com --recv-keys 052996E2A20B5C7E
```

### Download the checksums file and its signature, then verify the signature

```
curl -LO ${OPERATOR_SDK_DL_URL}/checksums.txt
curl -LO ${OPERATOR_SDK_DL_URL}/checksums.txt.asc
gpg -u "Operator SDK (release) <cncf-operator-sdk@cncf.io>" --verify checksums.txt.asc
grep operator-sdk_${OS}_${ARCH} checksums.txt | sha256sum -c -
```


## Install the release binary in your PATH"

```
chmod +x operator-sdk_${OS}_${ARCH} && sudo mv operator-sdk_${OS}_${ARCH} $BINPATH/operator-sdk
```

# This project was created with

## Go Version

Note: Still not supporting versions Go >= 1.18

```
go version go1.17.8 linux/amd64
```

## Kubernetes vanilla version (kubeadm)

```
Server Version: version.Info{Major:"1", Minor:"23", GitVersion:"v1.23.5", GitCommit:"c285e781331a3785a7f436042c65c5641ce8a9e9", GitTreeState:"clean", BuildDate:"2022-03-16T15:52:18Z", GoVersion:"go1.17.8", Compiler:"gc", Platform:"linux/amd64"}
```
## Operator SDK Version

```
operator-sdk version: "v1.21.0", commit: "89d21a133750aee994476736fa9523656c793588", kubernetes version: "1.23", go version: "go1.17.10", GOOS: "linux", GOARCH: "amd64"
```

# Kudu Operator

Project bootstraped with:

```
operator-sdk init --domain apache.org --repo github.com/antelopedb/antelopedb/kubernetes/kudu-operator
operator-sdk create api --group kudu --version v1alpha1 --kind KuduCluster --resource --controller
```

