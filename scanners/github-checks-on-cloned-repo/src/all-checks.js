import { HasApiDirectory, hasDependabotYaml } from './src/has-api-directory.js'
import { HasDependabotYaml } from './src/has-dependabot-yaml.js'
import { HasTestsDirectory } from './src/has-tests-directory.js'
import { HasSecurityMd } from "./src/has-security-md.js"
import { Dockerignore, Gitignore } from "./src/get-dotignore-details.js"
import { CheckOnClonedRepoStrategy } from './check-on-cloned-repo-strategy.js'

export class AllChecks extends CheckOnClonedRepoStrategy {
    async doRepoCheck() {

        console.log(
            `hasTestDirectory: ${JSON.stringify(formatedTestDirectory)}`
        )
        return formatedTestDirectory
    }
    checkName() {
        this.checkName = 'allChecks'
        console.log(`checkName is ${this.checkName}`)
        return this.checkName
    }
  }