
export class RepoChecker {
    async makeOctokitRequest(processor, branchName='main'){
        return processor.makeOctokitRequest(branchName)
    }
    formatResponse(processor){
        return processor.formatResponse()
    }
    // doRepoCheck(processor){
    //     return processor.doRepoCheck()
    // }
    // checkName(processor){
    //     return processor.checkName()
    // }
    // publishCheck(processor){
    //     return processor.publishCheck()
    // }
}