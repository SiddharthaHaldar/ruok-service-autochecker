
export class RepoChecker {
    async makeOctokitRequest(processor, branchName='main'){
        return processor.makeOctokitRequest(branchName)
    }
    formatResponse(processor){
        return processor.formatResponse()
    }
}