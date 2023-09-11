import { extractAnnotationsFromDnsRecords, consolidateProjectAnnotations, hasPhacDataHubGitHubRepo } from '../extract-project-metadata-from-dns-repo'; 
import {expect, jest, test} from '@jest/globals';
import * as fsPromises from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import { tmpdir } from 'os';
import { mkdtemp, writeFile } from 'fs/promises';

describe('extractAnnotationsFromDnsRecords', () => {
    let tempDir; // Temporary directory path

    beforeAll(async () => {
        const currentModuleDir = path.dirname(new URL(import.meta.url).pathname);

        // Create the temporary directory
        tempDir = path.join(currentModuleDir, 'temp-cloned-repo', 'dns-records');
        await fsPromises.mkdir(tempDir, { recursive: true });
  
        const mockedDnsRecords = {
            'file1.yaml': '---\nmetadata:\n  annotations:\n    projectName: Project1\n    sourceCodeRepository: https://github.com/project1\n',
            'file2.yaml': '---\nmetadata:\n  annotations:\n    projectName: Project2\n    sourceCodeRepository: https://github.com/project2\n',
        };

        for (const [fileName, content] of Object.entries(mockedDnsRecords)) {
            await writeFile(path.join(tempDir, fileName), content);
        }
    });

    afterAll(async () => {
        // Clean up the temporary directory
        await fsPromises.rm(tempDir, { recursive: true, force: true });
    });

    it('should extract annotations from DNS records', async () => {
        const annotations = await extractAnnotationsFromDnsRecords('./__tests__/temp-cloned-repo/dns-records');

        expect(annotations).toHaveLength(2);

        expect(annotations).toContainEqual({
            projectName: 'Project1',
            sourceCodeRepository: 'https://github.com/project1',
        });

        expect(annotations).toContainEqual({
            projectName: 'Project2',
            sourceCodeRepository: 'https://github.com/project2',
        });
    });
});

describe('consolidateProjectAnnotations', () => {
    it('should consolidate project annotations', async () => {
        const sampleAnnotations = [
            {
                projectName: 'Project1',
                sourceCodeRepository: 'https://github.com/project1',
                serviceEndpointUrls: 'https://service1.com',
                containerRegistries: undefined,
            },
            {
                projectName: 'Project2',
                sourceCodeRepository: 'https://github.com/project2',
                serviceEndpointUrls: undefined,
                containerRegistries: 'https://container1.com',
            },
            {
                projectName: 'Project2',
                sourceCodeRepository: 'https://github.com/project2',
                containerRegistries: 'https://container1.com',
            },
        ];
  
        const consolidatedProjects = await consolidateProjectAnnotations(sampleAnnotations);
        console.log(consolidatedProjects)
    
        expect(consolidatedProjects).toHaveLength(2);
        expect(typeof consolidatedProjects).toBe('object');
        
        expect(consolidatedProjects[0]).toEqual({
            projectName: 'Project1',
            sourceCodeRepository: 'https://github.com/project1',
            serviceEndpointUrls: 'https://service1.com',
        });
        expect(consolidatedProjects[1]).toEqual({
            projectName: 'Project2',
            sourceCodeRepository: 'https://github.com/project2',
            containerRegistries: 'https://container1.com',
        });
    });
});


describe('hasPhacDataHubGitHubRepo', () => {
    it('should return true when sourceCodeRepository starts with "https://github.com/PHACDataHub/"', () => {
        const project = {
            sourceCodeRepository: 'https://github.com/PHACDataHub/my-repo',
        };
        const result = hasPhacDataHubGitHubRepo(project);
        expect(result).toBe(true);
    });
  
    it('should return false when sourceCodeRepository does not start with "https://github.com/PHACDataHub/"', () => {
        const project = {
            sourceCodeRepository: 'https://github.com/other-org/their-repo',
        };
        const result = hasPhacDataHubGitHubRepo(project);
        expect(result).toBe(false);
    });
  
    it('should return false when sourceCodeRepository is undefined', () => {
        const project = {
            // No sourceCodeRepository property
        };
        const result = hasPhacDataHubGitHubRepo(project);
        expect(result).toBe(false);
    });
  
    it('should return false when sourceCodeRepository is null', () => {
        const project = {
            sourceCodeRepository: null,
        };
        const result = hasPhacDataHubGitHubRepo(project);
        expect(result).toBe(false);
    });
});
