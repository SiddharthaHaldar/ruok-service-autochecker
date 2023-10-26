# Checks

When a repository event webhook is received, Observatory performs a series of automated checks. Broadly speaking, these checsk can be broken into the following categories.

| Check Type                | Purpose                                                                                                                     | Strategy                                                                                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Remote Repository Checks  | Verify compliance with source code repositories on remotes such as [GitHub](https://github.com).                            | [GitHub Octokit API](https://github.com/octokit/octokit.js)                                                                                           |
| Repository Content Checks | Perform scans on the contents of the repository.                                                                            | Deep clone the repository and use automated scanning tools (e.g. [Gitleaks](https://github.com/gitleaks/gitleaks)).                                   |
| URL Scanning Checks       | Perform security and compliance checks against the live instance(s) of the product                                          | Various automated scanning tools that interact with a public URL (e.g. [axe-core](https://github.com/dequelabs/axe-core) for accessibility scanning). |
| Container Image Checks    | Perform scans on the OCI image(s) associated with a product (only applicable to products that build and deploy OCI images). | Automated tooling to run scans against the built container (e.g. [Trivy](https://github.com/aquasecurity/trivy)).                                     |

The top-level data model for the GraphQL schema looks as follows:

```graphql
type RepositoryCheck {
    _key: String!
    remoteRepositoryCheck: RemoteRepositoryCheck
    repositoryContentCheck: RepositoryContentCheck
    containerImageCheck: [ContainerImageCheck]
    urlScanningCheck: [URLScanningCheck]
}
```

Note our assumption that one repository may deploy services behind multiple URLs and each repository may build more than one OCI image.

The sections below expand on each Check Type in greater detail, and also show the parts of our GraphQL schema that expose these Check Types.

## Remote Repository Checks

There are many idioms, best practices, and security requirements for remote source code repositories. Observatory automatically performs a number of these checks using information retrievable from the [GitHub Octokit API](https://github.com/octokit/octokit.js).

### GraphQL Schema

```graphql
--8<-- "api/src/schema/remote-repository-check.js:4:9"
...
--8<-- "api/src/schema/compliance-check.js:4:7"
```

### Vulnerability Alerts Enabled

> TODO

### Automated Security Fixes Enabled

> TODO

### Branch Protection Enabled

> TODO


## Repository Content Checks

A number of checks are performed by scanning a deep clone of the repository's contents. The purpose of these checks is to perform scanning on all of the source code, configuration, etc. contained in the repository.

### GraphQL Schema

```graphql
--8<-- "api/src/schema/repository-content-check.js:4:36"
```

### Has `Security.md`

A best practice with any open source code repository is to provide instructions via a `Security.md` file at the project root for how security vulnerabilities should be reported (see [GitHub's code security documentation](https://docs.github.com/en/code-security/getting-started/adding-a-security-policy-to-your-repository) for more information). This check verifies whether a repository contains a `Security.md` file.

**Remediation**

Include a file called `Security.md` at the root of your repository explaining how security vulnerabilities should be reported to the repository owner. For example, there may be an email address where vulnerability reports should be sent, and explicit instructions to *not* document security vulnerabilities in the repository issues.

**Data Example**

```jsonc
{
    // ...
    "hasSecurityMd":{
        "checkPasses": true,
        "metadata": null,
        "lastUpdated": 1698174245826
    }
    // ...
}
```

### Gitleaks Report

> TODO

### File Size Check

> TODO

### Hadolint `Dockerfile`

[`hadolint`](https://github.com/hadolint/hadolint) performs a series of lint checks on each `Dockerfile` found in the repository.

> TODO

## URL (Service) Scanning Checks

Some products have one or more services exposed through URLs. URL compliance checks perform a series of automated accessibility and security compliance checks using information that can be retrieved via these public URLs.

### GraphQL Schema

```graphql
--8<-- "api/src/schema/url-scanning-check.js:4:11"
```

## Container Image Checks

Any products that build and deploy OCI images perform a series of checks on the built image artifact(s).

### GraphQL Schema

```graphql
--8<-- "api/src/schema/container-image-check.js:4:20"
```


## Global GraphQL Schema

