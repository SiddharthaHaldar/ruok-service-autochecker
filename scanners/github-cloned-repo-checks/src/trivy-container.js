// https://github.com/googleapis/google-cloud-node/tree/main/packages/google-devtools-cloudbuild
// gcloud builds submit --config=cloudbuild.yaml .
import { spawn } from 'child_process';
import { once } from 'events';
import path from 'path';
import { glob } from 'glob'
import { CheckOnClonedRepoInterface } from './check-on-cloned-repo-interface.js'


function buildAndScanImage(clonedRepoPath){
    const dockerfilePaths = glob.sync(path.join(clonedRepoPath, '**', '*Dockerfile*'));
    console.log(dockerfilePaths)

    let results = []; 
    for (image in dockerfilePaths){
        // build image with docker
        // scan image
        // add to results
    }

}

const clonedRepoPath = '../../test-cloned-repos/ruok-service-autochecker'

const results = buildAndScanImage(clonedRepoPath)
console.log(results)