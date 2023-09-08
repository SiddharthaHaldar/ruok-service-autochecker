// copied from github-repo-scanner
import { simpleGit } from "simple-git";
import * as fse from 'fs-extra'
import * as path from 'path';
import { fileURLToPath } from 'url';
// import dotenv from 'dotenv'
// // import 'dotenv-safe/config.js'
// dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function cloneDnsRepository() { 
  //  Clones repository using simple-git
  //  TODO - add error handing if repo already exists 

    // const repoPath = `.src/temp-cloned-repo/dns`;
    const repoPath = path.join(__dirname, 'temp-cloned-repo', 'dns');
    const clone_url = "git@github.com:PHACDataHub/dns.git"
    console.log(repoPath)
    
    return new Promise((resolve, reject) => {
      simpleGit().clone(clone_url, repoPath, (error) => {
        if (error) {
          console.error('Error cloning dns repository:', error);
          reject(error); 
        } else {
          console.log('dns Repository cloned successfully.');
          resolve(repoPath); 
        }
      });
    });
  }
  // cloneDnsRepository()
// const clone_url = "git@github.com:PHACDataHub/dns.git"
// const repoPath = await cloneRepository(clone_url, repo);


export async function removeClonedDnsRepository() {
  // const clonedRepoPath = `./temp-cloned-repo/dns`;
  const clonedRepoPath = path.join(__dirname, 'temp-cloned-repo', 'dns');
  fse.remove(clonedRepoPath)
    .then(() => {
      console.log('DNS cloned directory removed successfully.');
    })
    .catch((err) => {
      console.error('Error removing directory:', err);
    });
  }
