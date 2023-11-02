# Register a Repository with Observatory

Registering new repositories with Observatory requires a few simple steps.

## Create a `.product.yaml` File

Create a `.product.yaml` file at the repository root with the following fields.

```yaml
productName: Your Product Name
webappUrls:
- https://product-url-1.phac.alpha.canada.ca
- https://product-url-2.phac.alpha.canada.ca
apiUrls:
- https://api-url-1.phac.alpha.canada.ca
containerRegistryUrls:
- northamerica-northeast1-docker.pkg.dev/product-container-1@sha256:abcxyz
- northamerica-northeast1-docker.pkg.dev/product-container-2@sha256:abc123
- northamerica-northeast1-docker.pkg.dev/product-container-3@sha256:xyz123
```