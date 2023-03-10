## Release new helm chart version for compage
   ```shell
   cd charts
   # update chart version by updating Chart.yaml
   helm package compage
   helm repo index .
   git add .
   git commit -m "new chart version"
   git push
   ```

## Install from published chart.
   ```shell
   minikube start
   kubectl create ns compage
   kubectl config set-context --current --namespace=compage
   kubectl create secret docker-registry compage-pull-secret --docker-server=ghcr.io --docker-username=mahendraintelops --docker-password=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 --docker-email=mahendra.b@intelops.dev
   minikube ip
   ```

### update minikube ip in /etc/hosts. 
`MINIKUBE_IP (retrieved by minikube ip command) www.compage.dev`

## Install the latest version from GitHub helm repository.
   ```shell
   GITHUB_TOKEN="" # ask Mahendra for token
   helm repo remove intelops
   helm repo add "intelops" --username $GITHUB_TOKEN --password $GITHUB_TOKEN "https://raw.githubusercontent.com/intelops/compage/main/charts"
   helm pull intelops/compage --username $GITHUB_TOKEN --password $GITHUB_TOKEN
   helm install compage intelops/compage --values charts/compage/values.yaml
   kubectl get pods -n compage
   
   kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=compage-ui
   kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=compage-core
   kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=compage-app
   ```

### Go to http://www.compage.dev:32222