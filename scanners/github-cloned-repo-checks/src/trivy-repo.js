
// Trivy filesystem scan - looks for vunerablities based on lock files. 
// https://aquasecurity.github.io/trivy/v0.17.2/scanning/filesystem/

// Note trivy has scan remote Git Repository functionality, but only available for public repositories. Since, we
// have the repositories cloned and available as filesystems, we will be using that option instead. 

import { spawn } from 'child_process';
import path from 'path';
import { mkdtemp, rm } from 'fs/promises';
import os from 'os';
import { CheckOnClonedRepoInterface } from './check-on-cloned-repo-interface.js'
import fs from 'fs'

// const clonedRepoPath = '../../test-cloned-repos/ruok-service-autochecker'


async function runTrivyScan(clonedRepoPath) {
    return new Promise(async (resolve, reject) => {

        console.log ('******************** clonedRepoPath')
        console.log(clonedRepoPath)
        console.log ('/n')

        // define temp output file path 
        const tempDir = await mkdtemp(path.join(os.tmpdir(), 'trivy-'));
        const scanResultsFilePath  = path.join(tempDir, 'trivy-report.json');

        const trivyProcess = spawn('trivy',
            [ 
                'fs',
                '-f',  'json',
                '-o', scanResultsFilePath,
                // '--scanners', 'vuln',
                // '--scanners', 'misconfig',
                // '--scanners', 'license', // need to npm install for this to work 
                clonedRepoPath
            ])
        
        trivyProcess.stderr.on('data', (data) => {
            console.error(`Trivy stderr: ${data}`);
        });

        trivyProcess.on('close', async (code) => {
            console.log(`Trivy process exited with code ${code}`);
            
            if (code === 0) { // i.e., exited without errors
                console.log(`Trivy scan completed successfully. Results saved to ${scanResultsFilePath}`);
                const results = await parseScanResults(scanResultsFilePath)

                // remove temp dir with results
                try {
                    await rm(tempDir, { recursive: true });
                    console.log(`Temporary directory ${tempDir} removed.`);
                } catch (removeError) {
                    console.error(`Error removing temporary directory ${tempDir}: ${removeError.message}`);
                }

                resolve (results)
            } else {
                console.error('Trivy scan failed.');
                reject('trivy failed')
            }
        });
    });
}

async function parseScanResults(scanResultsFilePath){
    // Read the JSON data from the file
    let results = []
    try {
        const jsonData = fs.readFileSync(scanResultsFilePath, 'utf8');
        const json = JSON.parse(jsonData);

        // Check if the "Results" array exists in the JSON
        if (json && json.Results && Array.isArray(json.Results)) {
            json.Results.forEach(result => {
                // Check if the "Vulnerabilities" array exists in each result
                if (result.Vulnerabilities && Array.isArray(result.Vulnerabilities)) {
                    // Iterate over each vulnerability in the "Vulnerabilities" array
                    result.Vulnerabilities.forEach(vulnerability => {
                        results.push({
                            library: vulnerability.PkgName,
                            vulnerabilityID: vulnerability.VulnerabilityID,
                            severity: vulnerability.Severity,
                            installedVersion: vulnerability.InstalledVersion,
                            fixedVersion: vulnerability.FixedVersion || 'N/A',
                            title: vulnerability.Title,
                            url: vulnerability.PrimaryURL
                        });
 
                    });
                }
            });
            console.log('*****************')
            console.log(results)
            return results
        }

    } catch (error) {
        console.error('Error reading or parsing JSON file:', error);
        return []
    }
}



export class TrivyRepo extends CheckOnClonedRepoInterface {
    constructor(repoName, clonedRepoPath) {
        super(repoName, clonedRepoPath);
        this.clonedRepoPath = clonedRepoPath;
        this.repoName = repoName;
    }

    async doRepoCheck() {
        try {
            const trivyRepoResult = await runTrivyScan(this.clonedRepoPath); 
      
            return {
              checkPasses: (trivyRepoResult == 0),
              metadata: trivyRepoResult
            }

        } catch (error) {
            console.error(error.message);
            return {
                checkPasses: null,
                metadata: {
                errorMessage: 'An unexpected error occurred with trivy check.',
                },
            };
        }
    }
}