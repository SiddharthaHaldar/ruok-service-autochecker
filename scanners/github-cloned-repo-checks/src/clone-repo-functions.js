import * as fse from 'fs-extra'
import { simpleGit } from "simple-git"
import os  from 'os'
import path from 'path'

export async function extractUrlParts(sourceCodeRepository) {
  const parts = sourceCodeRepository.split('/');
  const repoName = parts[parts.length - 1];
  const cloneUrl = `git@github.com:${parts[parts.length - 2]}/${repoName}.git`;
  return { cloneUrl };
}


export async function cloneRepository(clone_url, repoName) {
  try {
    const tempDir = os.tmpdir();
    const repoPath = path.join(tempDir, `${repoName}-${Date.now()}`)

    // Clone repo
    await simpleGit().clone(clone_url, repoPath)
    console.log('Repository cloned successfully.')
    return repoPath

  } catch (error) {
    console.error('Error cloning repository:', error);
  }
}


// export async function cloneRepository(clone_url, repo) {
//     const repoPath = `../../temp-cloned-repo/${repo}`;
//     try {
//       const clonedRepoExists = await fse.pathExists(repoPath);
//       if (clonedRepoExists) {
//         // remove repo
//         await removeClonedRepository(repoPath);
//       }
  
//       // Clone repo
//       await simpleGit().clone(clone_url, repoPath);
//       console.log('Repository cloned successfully.');
//       return repoPath;
//     } catch (error) {
//       console.error('Error cloning repository:', error);
//       throw error; 
//     }
//   }


export async function removeClonedRepository(clonedRepoPath) {
    try {
      await fse.remove(clonedRepoPath);
      console.log('Cloned repository removed successfully.');
    } catch (err) {
      console.error('Error removing directory:', err);
      throw err; 
    }
  }