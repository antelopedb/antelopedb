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
sh manage-opennebula-vms.sh -e master.domain.com -u theuser -p thepassword -n 2 -c 2 -m 2048
cd target
terraform init
terraform validate
terraform apply
```
