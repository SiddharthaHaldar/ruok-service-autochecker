import { cloneDnsRepository, removeClonedDnsRepository } from '../clone-dns-repo.js';
import fsExtra from 'fs-extra';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('cloneDnsRepository', () => {
    it('should clone the DNS repository successfully', async () => {
      const repoPath = await cloneDnsRepository();  
      
      expect(repoPath).toBeTruthy();   
    });
  });


describe('Remove cloned DNS repository', () => {
  it('should remove the cloned DNS repository successfully', async () => {

    // const repoPath = await cloneDnsRepository();
    await removeClonedDnsRepository();

    const clonedRepoPath = path.join(__dirname, 'temp-cloned-repo', 'dns');
    const exists = await fsExtra.pathExists(clonedRepoPath);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // logging after the fact was causing issues - so adding timeout here. 
   
    expect(exists).toBe(false);
  });
});