// import { Payment } from "./src/repo-check-context.js"
// import { Chase } from "./src/Chase.js"
// import { Citi } from "./src/City.js"

// const payment = new Payment()

// payment.pay(new Chase(200, "00002302302"))


import { RepoChecker } from "./src/repo-check-context.js"
import { HasApiDirectory, hasDependabotYaml } from './src/has-api-directory.js'
import { HasDependabotYaml } from './src/has-dependabot-yaml.js'
import { HasTestsDirectory } from './src/has-tests-directory.js'
import { HasSecurityMd } from "./src/has-security-md.js"
import { DotDockerIgnoreDetails, DotGitIgnoreDetails } from "./src/get-dotignore-details.js"

const repoCheck = new RepoChecker()

// get repoName from payload
const hasApiDir = new HasApiDirectory('ruok-service-autochecker')
repoCheck.checkName(hasApiDir )
repoCheck.doRepoCheck(hasApiDir )

const hasDependabotYml = new HasDependabotYaml('ruok-service-autochecker')
repoCheck.checkName(hasDependabotYml)
repoCheck.doRepoCheck(hasDependabotYml)

const hasTestsDirectory = new HasTestsDirectory('ruok-service-autochecker')
repoCheck.checkName(hasTestsDirectory)
repoCheck.doRepoCheck(hasTestsDirectory)

const hasSecurityMd = new HasSecurityMd('ruok-service-autochecker')
repoCheck.checkName(hasSecurityMd)
repoCheck.doRepoCheck(hasSecurityMd)

const dockerignoreCheck = new DotDockerIgnoreDetails('ruok-service-autochecker')
repoCheck.checkName(dockerignoreCheck)
repoCheck.doRepoCheck(dockerignoreCheck)

const gitignoreCheck = new DotGitIgnoreDetails('ruok-service-autochecker')
repoCheck.checkName(gitignoreCheck)
repoCheck.doRepoCheck(gitignoreCheck)

//   await publish(`${NATS_PUB_STREAM}.${checkName}.${repoName}`, {'gitignoreDetails': gitignoreDetails}) 
//   console.log(`Sent to ... ${NATS_PUB_STREAM}.${checkName}.${repoName}: `, {'gitignoreDetails': gitignoreDetails})
  
// const hasApiDir = new HasApiDirectory('ruok-service-autochecker')
// const gitignoreCheck = new Gitignore('ruok-service-autochecker')

