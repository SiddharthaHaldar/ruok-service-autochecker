// https://github.com/octokit/octokit.js/#octokitrest-endpoint-methods
// TODO - graphql 
// TOTALLY JUST playing with the API at the moment - EXPECT SPAGHETTI CODE - will clean up next week 
// TODO - use env file, use nats, pull services and run functions for each 

import { Octokit, App,  RequestError } from "octokit";
// import { repoDetails } from "./src/repo-details.js"
// import { licenceDetails } from "./src/has-licence.js"
import { licenceDetails, repoDetails, githubPages, repoLanguages, getFileContents } from "./src/github-scanning-functions.js";
import dotenv from 'dotenv'
// import 'dotenv-safe/config.js'
dotenv.config()

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
  // token
  } = process.env;

// Authenicate with GitHub
const octokit = new Octokit({ 
    auth: token,
    // baseURL: "https://github.com/PHACDataHub"
});

// TODO - right now just logging to see - insert/ upsert into database instead! 

console.log("----- Repository Details -----")
// TODO - last updated is not correct! - would be nice to see ie if no longer in use and acumulating tech debt or need to be updated... 
await repoDetails(owner, repo, octokit)

console.log("----- Licence -----")
await licenceDetails(owner, repo, octokit)

console.log("\n----- GitHub Pages -----")
// TODO - check data to ensure actual page exisits (ie data discovery team and cpho have enabled, but no page)
await githubPages(owner, repo, octokit)

console.log("\n----- Languages -----")
await repoLanguages(owner, repo, octokit)


//look in .github folder find 

// TODO - see if requriements met if using langauges...a particular file 
// use to help find tests/ test coverage

// Find files/ pull out details of file 
//  Does the .gitignore file ignore files with credentials? ie: includes **/*.env
//  Does the .dockerignore files ignore files with credentials? ie: includes **/*.env

// console.log("/n---- gitignore contents")
// await getFileContents(owner, repo, octokit, path)
// get root directory (can pull out name?) - recursive scan for .gitignore, and .dockerignore
// try {
//   const repoContents = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
//     owner: owner,
//     repo: repo,
//     path: path,
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28'
//     }
//   });

//   const names = repoContents.data.map(content => content.name);
//   console.log(names);
//   // console.log(repoContents.data);
// } catch (error) {
//   console.error("An error occurred while fetching repository contents:", error.message);
// }

// get the tree - THIS IS A LOT OF ITEMS!!! DO NOT USE - will overload quota
// https://docs.github.com/en/rest/git/trees?apiVersion=2022-11-28#get-a-tree

// const repoTree = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
//   owner: owner,
//   repo: repo,
//   tree_sha: 'main',
//   headers: {
//     'X-GitHub-Api-Version': '2022-11-28'
//   },
//   recursive: "true", 
// })
// console.log(repoTree.data.tree)


// // THIS WORKS - but exceeded my limit so commenting out all this - try out cloning and finding directly next week (after tests!!)
// // ------ Get full list 
// const repoTree = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
//   owner: owner,
//   repo: repo,
//   tree_sha: 'main',
//   headers: {
//     'X-GitHub-Api-Version': '2022-11-28'
//   },
//   recursive: "true", 
// });

// const paths = repoTree.data.tree
//   .filter(item => !item.path.includes('node_modules')) // Filter out items with 'node_modules' in path
//   .map(item => item.path);

// console.log(paths);

// const gitignorePaths = repoTree.data.tree
//   .filter(item => item.path.endsWith('.gitignore') || item.path.includes('/.gitignore'))
//   .map(item => item.path);

// console.log(gitignorePaths);

// console.log("/n---- gitignore contents")
// await getFileContents(owner, repo, octokit, gitignorePaths[0]) //(or .gitignore or each folder?)


// // ---------Get contents of readme (or a file)
// try {
//   const repoContents = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
//     owner: owner,
//     repo: repo,
//     path: 'README.md',
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28'
//     }
//   });
//   console.log(repoContents);
//   console.log(Buffer.from(repoContents.data.content, 'base64').toString('utf-8'))
// } catch (error) {
//   console.error("An error occurred while fetching repository contents:", error.message);
// }

// SLOs established?
//  Uptime tracking?
//  Are there tests? Is coverage enabled?
//  DNS takeovers
//  Subdomain takeovers
//  Is Secret scanning enabled for that repo?
//  Is there a security.md file?
//  existence of an API
//  REST/graphql
//  vuln scanning enabled
//  More from Open data products spec: https://opendataproducts.org/
//  PHAC data standards - what are these and where do we find?


// ---- main branch protection
// // GET /repos/{owner}/{repo}/branches/{branch}/protection (main - atually get main branch from earlier)
// const response1 = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}/protection', {
//     owner: owner,
//     repo: repo,
//     branch: branch,
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28'
//     }
//   })
// console.log(response1.data); //- 404 and message - make sure tests

// // ----- pull resquest review protection
// const resp = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews', {
//     owner: owner,
//     repo: repo,
//     branch: branch,
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28'
//     }
//   })
// console.log(resp.data)

// #THIS WORKS - get issues for repo
// octokit.paginate(octokit.rest.issues.listForRepo, {
//     owner: owner,
//     repo: repo
//   })
//     .then(issues => {
//         console.log('Total issues:', issues.length);
//         issues.forEach(issue => {
//             console.log('Issue Title:', issue.title);
//           });
//     })

// console.log("\n----- Dependabot -----")
// ----- Dependabot alerts - GET YOU ARE NOT AUTHORIZED TO DO THIS error for this one - I think we need to start with just checking if alerts 
//      enabled - not the alerts themselves at this point. 
// const response = await octokit.request('GET /repos/{owner}/{repo}/dependabot/alerts', {
//     owner: owner,
//     repo: repo,
//     // headers: {
//     //     'X-GitHub-Api-Version': '2022-11-28'
//     // }
//     });
// console.log(response.data);


// // vunerability alerts (https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#check-if-vulnerability-alerts-are-enabled-for-a-repository)
// // 404 not found 204 if is 
// const vunerabilityResponse = await octokit.request('GET /repos/{owner}/{repo}/vulnerability-alerts', {
//     owner: owner,
//     repo: repo,
//     headers: {
//         'X-GitHub-Api-Version': '2022-11-28'
//     }
//     });

// console.log(vunerabilityResponse.data.message);


// octokit.rest.codeScanning.listAlertsForRepo({
//     owner: owner,
//     repo: repo
//     });



// await octokit.request("POST /repos/{owner}/{repo}/issues", {
//     owner: "octocat",
//     repo: "hello-world",
//     title: "Hello, world!",
//     body: "I created this issue using Octokit!",
//   });

//   const { data } = await octokit.rest.repos.getContent({
//     mediaType: {
//       format: "raw",
//     },
//     owner: owner,
//     repo: repo,
//     path: "api/package.json",
//   });
//   console.log("package name: %s", JSON.parse(data).name);
try {
    // your code here that sends at least one Octokit request
    await octokit.request("GET /");
  } catch (error) {
    // Octokit errors always have a `error.status` property which is the http response code nad it's instance of RequestError
    if (error instanceof RequestError) {
      // handle Octokit error
      // error.message; // Oops
      // error.status; // 500
      // error.request; // { method, url, headers, body }
      // error.response; // { url, status, headers, data }
    } else {
      // handle all other errors
      throw error;
    }
  }

  // ------login information graphql vs rest
  // // Login example with rest and graphql
// // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
// const {
//   data: { login },
//   } = await octokit.rest.users.getAuthenticated();

// console.log("Hello, %s", login);
// console.log("")

// const {
//     viewer: { login },
//   } = await octokit.graphql(`{
//     viewer {
//       login
//     }
//   }`);
// console.log("")
// console.log("Hello, %s", login);


//   const { data } = await octokit.rest.repos.getContent({
//     mediaType: {
//       format: "raw",
//     },
//     owner: owner,
//     repo: repo,
//     path: "./LICENCE",
//   });
//   console.log("package name: %s", JSON.parse(data).name);

