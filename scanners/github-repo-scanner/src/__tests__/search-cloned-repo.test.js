import { searchForFile, searchForDirectory, hasApiDirectory, hasDependabotYaml, hasSecurityMd, searchTests  } from '../search-cloned-repo';
import * as fs from 'fs';


describe('searchForFile function', () => {
    let testDirectory;
  
    beforeAll(() => {
        // temp directory 
        testDirectory = './src/__tests__/temp-test-directory';
        if (!fs.existsSync(testDirectory)) {
            fs.mkdirSync(testDirectory);
        }
    
        // temp test files in the temp directory
        fs.writeFileSync(`${testDirectory}/file1.txt`, '');
        fs.writeFileSync(`${testDirectory}/file2.txt`, '');
        fs.mkdirSync(`${testDirectory}/subdir`);
        fs.writeFileSync(`${testDirectory}/subdir/file3.txt`, '');
    });
  
    afterAll(() => {
        // clean up
        if (fs.existsSync(testDirectory)) {
            fs.rmdirSync(testDirectory, { recursive: true });
        }
    });
  
    it('should find files with a given name', () => {
        const foundFiles = searchForFile(testDirectory, 'file1.txt');

        expect(foundFiles).toHaveLength(1); 
        expect(foundFiles).toContain(`${testDirectory}/file1.txt`); 
    });
  
    it('should return an empty array if no files match', () => {
        const foundFiles = searchForFile(testDirectory, 'nonexistent.txt');
    
        expect(foundFiles).toHaveLength(0); 
    });
});



  describe('searchForDirectory function', () => {
    let testDirectory;
  
    beforeAll(() => {
      // temp dir
        testDirectory = './temp-test-directory';
        if (!fs.existsSync(testDirectory)) {
            fs.mkdirSync(testDirectory);
        }
  
      // subdirectories in the temp directory
        fs.mkdirSync(`${testDirectory}/dir1`);
        fs.mkdirSync(`${testDirectory}/dir2`);
        fs.mkdirSync(`${testDirectory}/dir1/sub1`);
        fs.mkdirSync(`${testDirectory}/dir2/subdir2`);
    });
  
    afterAll(() => {
      // clean up
        if (fs.existsSync(testDirectory)) {
            fs.rmdirSync(testDirectory, { recursive: true });
        }
    });
  
    it('should find directories with a given name', () => {
        const foundDirs = searchForDirectory(testDirectory, 'dir');
        console.log('****************', foundDirs)
        expect(foundDirs).toHaveLength(3); 
        expect(foundDirs).toContain(`${testDirectory}/dir1`); 
        expect(foundDirs).toContain(`${testDirectory}/dir2`);
    });
  
    it('should return an empty array if no directories match', () => {
        const foundDirs = searchForDirectory(testDirectory, 'nonexistent');
    
        expect(foundDirs).toHaveLength(0); 
    });
  });

  describe('hasApiDirectory function', () => {
    let testDirectory;
  
    beforeAll(() => {
      // temporary dir 
        testDirectory = './temp-test-directory';
        if (!fs.existsSync(testDirectory)) {
            fs.mkdirSync(testDirectory);
        }
  
      // create api dir
      fs.mkdirSync(`${testDirectory}/api`); 
    });
  
    afterAll(() => {
        // clean up
        if (fs.existsSync(testDirectory)) {
            fs.rmdirSync(testDirectory, { recursive: true });
        }
    });
  
    it('should return true if an "api" directory exists', async () => {
        const hasApi = await hasApiDirectory(testDirectory);
    
        expect(hasApi).toBe(true); 
    });
  
    it('should return false if no "api" directory exists', async () => {
        // rm api dir
        fs.rmdirSync(`${testDirectory}/api`);
        const hasApi = await hasApiDirectory(testDirectory);

        expect(hasApi).toBe(false); 
    });

});


describe('hasDependabotYaml function', () => {
    let testDirectory;

    beforeAll(() => {
        testDirectory = `./temp-test-directory`;
        if (!fs.existsSync(testDirectory)) {
            fs.mkdirSync(testDirectory);
        }
    });

    afterAll(() => {
        // clean up
        console.log('Cleaning up...');
        if (fs.existsSync(testDirectory)) {
            fs.rmdirSync(testDirectory, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error removing directory:', err);
                } else {
                    console.log('Directory removed successfully.');
                }
            });
        }
    });

    it('should return true if a dependabot YAML file exists', async () => {
        // create a dependabot YAML file
        fs.writeFileSync(`${testDirectory}/dependabot.yaml`, '');
        const hasDependabotFile = await hasDependabotYaml(testDirectory);
    
        expect(hasDependabotFile).toBe(true); // Should return true because we created the file
    });

    it('should return true if a dependabot YML file exists', async () => {
        // remove YAML
        fs.unlinkSync(`${testDirectory}/dependabot.yaml`);
        // create a dependabot YML file 
        fs.writeFileSync(`${testDirectory}/dependabot.yml`, '');
        const hasDependabotFile = await hasDependabotYaml(testDirectory);

        expect(hasDependabotFile).toBe(true); 
    });

    it('should return false if no dependabot yaml/yml file exists', async () => {
        fs.unlinkSync(`${testDirectory}/dependabot.yml`);
        const hasDependabotFile = await hasDependabotYaml(testDirectory);
    
        expect(hasDependabotFile).toBe(false); 
    });
});



describe('hasSecurityMd function', () => {
    let testDirectory;

    beforeAll(() => {
        testDirectory = './temp-test-directory';
        if (!fs.existsSync(testDirectory)) {
            fs.mkdirSync(testDirectory);
        }
    });

    afterAll(() => {
        // clean up
        if (fs.existsSync(testDirectory)) {
            fs.rmdirSync(testDirectory, { recursive: true });
        }
    });

    it('should return true if a security.md file exists', async () => {
        fs.writeFileSync(`${testDirectory}/SECURITY.md`, '');
        const hasSecurityMdFile = await hasSecurityMd(testDirectory);

        expect(hasSecurityMdFile).toBe(true);
    });

    it('should return false if no security.md file exists', async () => {
        fs.unlinkSync(`${testDirectory}/SECURITY.md`)
        const hasSecurityMdFile = await hasSecurityMd(testDirectory);

        expect(hasSecurityMdFile).toBe(false); 
    });
});


// describe('searchTests function', () => {
//     let testDirectory;

//     beforeAll(() => {
//         testDirectory = './temp-test-directory';
//         if (!fs.existsSync(testDirectory)) {
//             fs.mkdirSync(testDirectory);
//         }

//         fs.mkdirSync(`${testDirectory}/dir1`);
//         fs.mkdirSync(`${testDirectory}/dir2`);
//         fs.mkdirSync(`${testDirectory}/__tests__/`);
//         fs.mkdirSync(`${testDirectory}/dir1/__tests__/`);
//         fs.mkdirSync(`${testDirectory}/dir1/tests`);

//         fs.writeFileSync(`${testDirectory}/dir1/test1.js`, '');
//         fs.writeFileSync(`${testDirectory}/dir1/test2.js`, '');
//         fs.writeFileSync(`${testDirectory}/__tests__/test2.js`, '');
//         fs.writeFileSync(`${testDirectory}/__tests__/test2.js`, '');
//     });

//     afterAll(() => {
//         // clean up
//         if (fs.existsSync(testDirectory)) {
//             fs.rmdirSync(testDirectory, { recursive: true });
//         }
//     });

//     it('should return test directories with non-empty files', async () => {
//         const testDetails = await searchTests(testDirectory);

//         expect(testDetails).toHaveLength(1); // We expect only one test directory with non-empty files
//         expect(testDetails[0].repoScopedPath).toBe('dir1');
//     });

//     it('should return an empty array if no test directories exist', async () => {
//         // Remove the test subdirectories
//         fs.rmdirSync(`${testDirectory}/dir1`, { recursive: true });
//         fs.rmdirSync(`${testDirectory}/dir2`, { recursive: true });

//         const testDetails = await searchTests(testDirectory);

//         expect(testDetails).toHaveLength(0); 
//     });
// });

