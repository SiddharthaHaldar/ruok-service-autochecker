// fs docs node https://nodejs.org/docs/v0.3.4/api/fs.html
import * as fs from 'fs';
import * as util from 'util';

// api directory - libraries? - expand into endpoints etc...consume it?

export function searchForFile(directory, targetFileName) {
    // searches directory and returns array of file paths for any found targetFileNames
    const files = fs.readdirSync(directory);
    const foundFilePaths = []
    for (const file of files) {
        const fullPath = `${directory}/${file}`;
        // Determine if it's a file or directory
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            const subDirectoryPaths = searchForFile(fullPath, targetFileName);
            foundFilePaths.push(...subDirectoryPaths); 
        } else if (file === targetFileName) {
            foundFilePaths.push(fullPath); 
        }
    }
    return(foundFilePaths)
}

function searchForDirectory(directory, targetDirectoryName) {
    const entries = fs.readdirSync(directory);
    const foundDirectoryPaths = [];
  
    for (const entry of entries) {
      const fullPath = `${directory}/${entry}`;
      const stat = fs.statSync(fullPath);
  
      if (stat.isDirectory() && entry === targetDirectoryName) {
        foundDirectoryPaths.push(fullPath);
      }
    }
    return foundDirectoryPaths;
  }
 
export async function hasApiDirectory(directory) {
    const apiDirectories = searchForDirectory (directory, "api")
    if (apiDirectories.length > 0) {
        return true
    } else {
        return false
    }
} 

export async function hasSecurityMd(directory) {
    const securityMds = searchForFile(directory, "security.md")
    if (securityMds.length > 0) {
        return true
    } else {
        return false
    }
}


export async function searchIgnoreFile(directory, targetFileName) {
    const ignoreFilePaths = searchForFile(directory, targetFileName)
    const ignoreFileDetails = []
    // gitignoreDetails.push({numberOfGitignores: gitignoreFilePaths.length})

    if (ignoreFilePaths.length > 0) {
        for (const filePath of ignoreFilePaths) { //will this address null case?
            const repoScopedPath = filePath.split('/').slice(3).join('/'); // removing ./temp-cloned-repo/${repo}
            const hasDotenv = await searchFileForText(filePath, '.env') // temp value for logic  finding just .env in file (any form)
            const hasDoubleStarSlashStarDotenv = await searchFileForText(filePath, '\\*\\*/\\*.env') // in this case is **/*.env
            const hasDoubleStarSlashDotenvStar = await searchFileForText(filePath, '\\*\\*/.env.*') // looking for **/.env*
            ignoreFileDetails.push ({
                "repoScopedPath": repoScopedPath, 
                "hasDotenv": hasDotenv, 
                "hasDoubleStarSlashStarDotenv": hasDoubleStarSlashStarDotenv,
                "hasDoubleStarSlashDotenvStar": hasDoubleStarSlashDotenvStar
            });
        }
        return ignoreFileDetails     
    }
}


//Tests -search for tests, and non-empty file
// search for testing libraries present
// coverage ...

// const filePath = './temp-cloned-repo/it33-filtering/.gitignore'

export async function searchFileForText(filePath, text) {
    const readFileAsync = util.promisify(fs.readFile);
    
    const regEx = new RegExp(text);
    const result = [];

    try {
        const contents = await readFileAsync(filePath, 'utf8');
        let lines = contents.toString().split("\n");
        lines.forEach(line => {
            if (line && line.search(regEx) >= 0) {
                // console.log('found in file ', filePath);
                result.push(line);
            }
        });

        if (result.length > 0) {
            // console.log(text, "found text in file", result.length, "times");
            return true;
        } else {
            // console.log("text not found in file");
            return false;
        }
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
// const dotenvInGitIgnore = await searchFileForText(filePath, '\\*\\*/\\*.env')
// console.log(dotenvInGitIgnore)
// console.log("")

// function searchInsideFile(filePath, searchString){

// }
// export const searchFileForText = (filePath, text) => {
// // https://medium.com/codex/achieve-the-best-performance-search-a-string-in-file-using-nodejs-6a0f2a3b6cfa
//     return new Promise((resolve) => {
        
//         // const regEx = new RegExp(text, "i")
//         const regEx = new RegExp(text)
//         const result = [];

//         // fs.readFile('file/' + filename + ".txt", 'utf8', function (err, contents) {
//         fs.readFile(filePath, 'utf8', function (err, contents) {

//             // console.log(err)
//             let lines = contents.toString().split("\n");
//             lines.forEach(line => {
//                 if (line && line.search(regEx) >= 0) {
//                     console.log('found in file ', filePath)
//                     result.push(line)
//                 }
//             })
//             if (result.length > 0) {
//                 console.log( text, "found text in file");
//                 resolve(result);
//             } else {
//                 console.log("text not found in file");
//                 resolve([]);
//             }
//         })
//     });
// }
// searchFileForText(filePath, textToSearch)
//     .then(result => {
//         console.log('Search results:', result);
//     })
//     .catch(error => {
//         console.error('An error occurred:', error);
//     });
// searchFileForText(filePath, '.env') 
// searchFileForText(filePath, '**/*.env')

// (async () => {
//     const dotenvInGitIgnore = await searchFileForText(filePath, '\\*\\*/\\*.env'); 
//     console.log(dotenvInGitIgnore);
// })();

// // Going to extract the following:
// {gitignoreContainsAllDotEnv: [{path:t/F}]}
// {gitignoreContainsSomeDotEnv:}
// {dockerignoreContainsAllDotEnv}
// return paths, true/ false contain gitignore