# External Secrets Operator

**Create the IAM policy binding for iam.workloadIdentityUser role**

- `GSA_NAME`: name of google service account (e.g. `external-secrets`)
- `GSA_PROJECT`: GCP Project ID
- `PROJECT_ID`: GCP Project ID (if different from the project in which the service account is created)
- `NAMESPACE`: kubernetes namespace in which external secrets operator is installed
- `KSA_NAME`: name of kubernetes service account

```bash
gcloud iam service-accounts add-iam-policy-binding $GSA_NAME@$GSA_PROJECT.iam.gserviceaccount.com \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:$PROJECT_ID.svc.id.goog[$NAMESPACE/$KSA_NAME]"
```

**Create IAM policy binding between service account and iam.serviceAccountTokenCreator role**


```bash
gcloud projects add-iam-policy-binding $GSA_PROJECT \
    --member "serviceAccount:$GSA_NAME@$GSA_PROJECT.iam.gserviceaccount.com" \
    --role "roles/iam.serviceAccountTokenCreator"
```


## Useful Documentation

- [GitOps using FluxCD](https://external-secrets.io/v0.4.3/examples-gitops-using-fluxcd/)