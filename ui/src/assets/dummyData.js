const servicesData = {
  allServices: [
    {
      name: 'service-1',
      webUrl: 'https://service-1-ui.com',
      webUrlId: 'service-1-ui',
      license: 'MIT',
      visibility: 'public',
      owner: 'owner-1',
      repo: 'repo-1',
      programmingLanguage: 'JavaScript',
      description: 'Service 1 Description',
      automatedSecurityFixes: { checkPasses: true, metadata: {} },
      branchProtection: { checkPasses: true, metadata: {} },
      gitleaks: { checkPasses: true, metadata: {} },
      hadolint: {
        checkPasses: false,
        metadata: { vulnerabilities: ['CVE-2023-1234', 'CVE-2023-5678'] },
      },
      hasDependabotYaml: { checkPasses: true, metadata: {} },
      hasSecurityMd: { checkPasses: true, metadata: {} },
      vulnerabilityAlerts: {
        checkPasses: false,
        metadata: { vulnerabilities: ['CVE-2023-9876'] },
      },
      referencingEndpoints: [
        { id: 'endpoint-1', url: 's3://service-1-bucket', kind: 'AWS S3' },
        {
          id: 'endpoint-2',
          url: 'https://service-1-api-endpoint.com',
          kind: 'API',
        },
      ],
    },
    {
      name: 'service-2',
      webUrl: 'https://service-2-ui.com',
      webUrlId: 'service-2-ui',
      license: 'Apache-2.0',
      visibility: 'private',
      owner: 'owner-2',
      repo: 'repo-2',
      programmingLanguage: 'Python',
      description: 'Service 2 Description',
      automatedSecurityFixes: { checkPasses: true, metadata: {} },
      branchProtection: { checkPasses: true, metadata: {} },
      gitleaks: { checkPasses: true, metadata: {} },
      hadolint: { checkPasses: true, metadata: {} },
      hasDependabotYaml: { checkPasses: true, metadata: {} },
      hasSecurityMd: { checkPasses: true, metadata: {} },
      vulnerabilityAlerts: { checkPasses: true, metadata: {} },
      referencingEndpoints: [
        {
          id: 'endpoint-3',
          url: 'mysql://service-2-db-endpoint',
          kind: 'Database',
        },
        {
          id: 'endpoint-4',
          url: 'https://service-2-api-endpoint.com',
          kind: 'API',
        },
      ],
    },
    {
      name: 'service-3',
      webUrl: 'https://service-3-ui.com',
      webUrlId: 'service-3-ui',
      license: 'GPL-3.0',
      visibility: 'public',
      owner: 'owner-3',
      repo: 'repo-3',
      programmingLanguage: 'Ruby',
      description: 'Service 3 Description',
      automatedSecurityFixes: {
        checkPasses: false,
        metadata: { vulnerabilities: ['CVE-2023-1122'] },
      },
      branchProtection: { checkPasses: true, metadata: {} },
      gitleaks: {
        checkPasses: false,
        metadata: { vulnerabilities: ['CVE-2023-3344'] },
      },
      hadolint: {
        checkPasses: false,
        metadata: { vulnerabilities: ['CVE-2023-5566'] },
      },
      hasDependabotYaml: {
        checkPasses: false,
        metadata: { issues: ['Outdated dependencies'] },
      },
      hasSecurityMd: {
        checkPasses: false,
        metadata: { issues: ['Missing security guidelines'] },
      },
      vulnerabilityAlerts: {
        checkPasses: false,
        metadata: { vulnerabilities: ['CVE-2023-7788'] },
      },
      referencingEndpoints: [
        { id: 'endpoint-5', url: 's3://service-3-bucket', kind: 'AWS S3' },
        {
          id: 'endpoint-6',
          url: 'https://service-3-api-endpoint.com',
          kind: 'API',
        },
      ],
    },
  ],
}

const endpointData = {
  'endpoint-1': {
    url: 's3://service-1-bucket',
    kind: 'AWS S3',
    security: {
      encryption: 'AES-256',
      accessControl: 'Private',
      checkPasses: true,
      metadata: {},
    },
  },
  'endpoint-2': {
    url: 'https://service-1-api-endpoint.com',
    kind: 'API',
    security: {
      authentication: 'OAuth 2.0',
      rateLimiting: 'Enabled',
      checkPasses: true,
      metadata: {},
    },
  },
  'endpoint-3': {
    url: 'mysql://service-2-db-endpoint',
    kind: 'Database',
    security: {
      encryption: 'AES-256',
      accessControl: 'Database Roles',
      checkPasses: true,
      metadata: {},
    },
  },
  'endpoint-4': {
    url: 'https://service-2-api-endpoint.com',
    kind: 'API',
    security: {
      authentication: 'API Key',
      rateLimiting: 'Enabled',
      checkPasses: true,
      metadata: {},
    },
  },
  'endpoint-5': {
    url: 's3://service-3-bucket',
    kind: 'AWS S3',
    security: {
      encryption: 'AES-256',
      accessControl: 'Private',
      checkPasses: true,
      metadata: {},
    },
  },
  'endpoint-6': {
    url: 'https://service-3-api-endpoint.com',
    kind: 'API',
    security: {
      authentication: 'OAuth 2.0',
      rateLimiting: 'Enabled',
      checkPasses: true,
      metadata: {},
    },
  },
  'service-1-ui': {
    url: 'https://service-1-ui.com',
    kind: 'Web',
    accessibility: {
      url: 'https://service-1-ui.com',
      svgImgAlt: 'Service 1 Web Interface',
      checkPasses: false,
      metadata: {
        issues: ['Missing alt text for images', 'Color contrast issues'],
      },
    },
  },
  'service-2-ui': {
    url: 'https://service-2-ui.com',
    kind: 'Web',
    accessibility: {
      url: 'https://service-2-ui.com',
      svgImgAlt: 'Service 2 Web Interface',
      checkPasses: true,
      metadata: {},
    },
  },
  'service-3-ui': {
    url: 'https://service-3-ui.com',
    kind: 'Web',
    accessibility: {
      url: 'https://service-3-ui.com',
      svgImgAlt: 'Service 3 Web Interface',
      checkPasses: false,
      metadata: {
        issues: ['Broken links', 'Missing ARIA labels'],
      },
    },
  },
}

module.exports = {
  servicesData,
  endpointData,
}
