import { getAllRepos, licenceDetails, repoLanguages, getFileContents, getGithubPagesDetails, getCodeScanningAlerts } from '../github-details-with-octokit.js'; 
import nock from 'nock';
import {expect, jest, test} from '@jest/globals';
import 'dotenv/config'; 

import { Octokit, App,  RequestError } from "octokit";
// https://github.com/algolia/shipjs/blob/cfd4b2f3f7f0cfa5bae4ff89cc954f5b1264966d/packages/shipjs/src/step/release/__tests__/createGitHubRelease.spec.js#L34
// // from https://stackoverflow.com/questions/68605384/jest-mocking-of-octokit-library
// jest.mock('@octokit/rest')
// const request = () => new Promise((resolve, reject) => {
//   resolve({ status: 302, headers: { location: 'mock-url' } });
// })
// Octokit.mockImplementation(() => ({ request }))


const { 
  owner = 'PHACDataHub',
  token,
  repo = "safe-inputs"
  } = process.env;

// Authenicate with GitHub
const octokit = new Octokit({ 
    auth: token,
});

// describe('GitHub API Functions', () => {
//   const octokit = {
//     request: jest.fn(), 
//   };


describe('Octokit calls', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get all repos', async () => {
        const octokit = { request: jest.fn()};
        // mock response
        nock('https://api.github.com')
            .get('/orgs/PHACDataHub/repos')
            .reply(200, [{ name: 'repo1' }, { name: 'repo2' }]);

        await getAllRepos('PHACDataHub', octokit);

        expect(octokit.request).toHaveBeenCalledWith('GET /orgs/{org}/repos', {
            org: 'PHACDataHub',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
    });

  it('should get license response', async () => {
    const octokit = { request: jest.fn()};
    nock('https://api.github.com')
        .get('/repos/PHACDataHub/it33-filtering/license')
        .reply(200, { license: { spdx_id: 'MIT' } });

    const result = await licenceDetails('PHACDataHub', 'it33-filtering', octokit);

    expect(octokit.request).toHaveBeenCalledWith('GET /repos/{owner}/{repo}/license', {
        owner: 'PHACDataHub',
        repo: 'it33-filtering',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });
  });

  it('should get license details for repository with license', async () => {
    const owner = 'PHACDataHub'
    const repo = 'it33-filtering'
    const result = await licenceDetails(owner, repo, octokit)

    expect(result).toEqual({ hasLicense: true, license: 'MIT' });
  });

  it('should get license details for repository without license', async () => {
    const owner = 'PHACDataHub'
    const repo = 'dns'
    const result = await licenceDetails(owner, repo, octokit)

    expect(result).toEqual({ hasLicense: false, license: undefined });
  });

});