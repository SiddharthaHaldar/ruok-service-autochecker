// import { Octokit, App,  RequestError } from "octokit";
import { simpleGit } from "simple-git";
// import dotenv from 'dotenv'
// // import 'dotenv-safe/config.js'
// dotenv.config()

const { 
  owner = 'PHACDataHub',
  // repo = "Discovery-team",
  repo = "cpho-phase2",
  // repo = "DSCO-naming-app", // has github pages
  // repo = "nats-data-pipeline-demo", // licence but no file 
    // repo = 'it33-filtering', //just placeholder for now - will need to cycle through stream published from nats
  // repo = 'dns',
  branch = 'main',
  // token = process.env.GITHUB_TOKEN 
  token
  } = process.env;

// // Authenicate with GitHub
// const octokit = new Octokit({ 
//   auth: token,
//   // baseURL: "https://github.com/PHACDataHub"
// });
// // Use Octokit to get the repository's information


// export async function getRepositoryDetails(owner, repo, octokit) {
//   try {
//     const response = await octokit.request('GET /repos/{owner}/{repo}', {
//       owner: owner,
//       repo: repo,
//       headers: {
//         'X-GitHub-Api-Version': '2022-11-28'
//       }
//     });
//   // try {
//   //   const { data: repository } = await octokit.repos.get({
//   //     owner: owner,
//   //     repo: repo,
//   //   });
//     // return repository;
//     console.log(response.data)
//     return response.data
//   } catch (error) {
//     console.error('Get repository error:', error);
//     return null;
//   }
// }

// Clone the repository using simple-git
// export async function cloneRepository(repo) { // add cloneUrl from earlier


export async function cloneRepository(clone_url, repo) { 
  //  Clones repository using simple-git
  //  TODO - add error handing if repo already exists 

    const repoPath = `./temp-cloned-repo/${repo}`;
    console.log(repoPath)
    
    return new Promise((resolve, reject) => {
      simpleGit().clone(clone_url, repoPath, (error) => {
        if (error) {
          console.error('Error cloning repository:', error);
          reject(error); 
        } else {
          console.log('Repository cloned successfully.');
          resolve(repoPath); 
        }
      });
    });
  }

// const clone_url = "git@github.com:PHACDataHub/cpho-phase2.git"
// const repoPath = await cloneRepository(clone_url, repo);
// console.log(repoPath)

// TODO remove repo function

// remove repo
// const fs = require('fs/promises'); // Import the promises version of fs

// const directoryPath = './path/to/your/directory';

// fs.rm(directoryPath, { recursive: true, force: true })
//   .then(() => {
//     console.log('Directory removed successfully.');
//   })
//   .catch((err) => {
//     console.error('Error removing directory:', err);
//   });