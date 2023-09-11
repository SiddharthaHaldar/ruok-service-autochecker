import { extractAnnotationsFromDnsRecords, consolidateProjectAnnotations } from '../extract-project-metadata-from-dns-repo'; 

describe('extractAnnotationsFromDnsRecords', () => {
    it('should extract annotations from DNS records', async () => {
      const mockedDnsRecordsDirectory = {
        'file1.yaml': '---\nmetadata:\n  annotations:\n    projectName: Project1\n    sourceCodeRepository: https://github.com/project1\n',
        'file2.yaml': '---\nmetadata:\n  annotations:\n    projectName: Project2\n    sourceCodeRepository: https://github.com/project2\n',
      };
  
      // Mock the fs module to simulate reading the directory and files
      jest.spyOn(require('fs'), 'readdirSync').mockReturnValue(Object.keys(mockedDirectory));
      jest.spyOn(require('fs'), 'readFileSync').mockImplementation((filePath) => {
        return mockedDnsRecordsDirectory[path.basename(filePath)];
      });
  
      const annotations = await extractAnnotationsFromDnsRecords();
  
      expect(annotations).toHaveLength(2);
  
      expect(annotations).toContainEqual({
        projectName: 'Project1',
        sourceCodeRepository: 'https://github.com/project1',
      });
  
      expect(annotations).toContainEqual({
        projectName: 'Project2',
        sourceCodeRepository: 'https://github.com/project2',
      });
    });
  });

  describe('consolidateProjectAnnotations', () => {
    it('should consolidate project annotations', async () => {
      const sampleAnnotations = [
        {
            projectName: 'Project1',
            sourceCodeRepository: 'https://github.com/project1',
            serviceEndpointUrls: 'https://service1.com',
        },
        {
            projectName: 'Project2',
            sourceCodeRepository: 'https://github.com/project2',
            containerRegistries: 'https://container1.com',
        },
        {
            projectName: 'Project2',
            sourceCodeRepository: 'https://github.com/project2',
            containerRegistries: 'https://container1.com',
          },
      ];
  
      const consolidatedProjects = consolidateProjectAnnotations(sampleAnnotations);
      console.log(consolidatedProjects)
  
      expect(consolidatedProjects).toHaveLength(2);
  
      expect(consolidatedProjects).toContainEqual({
        projectName: 'Project1',
        sourceCodeRepository: 'https://github.com/project1',
        serviceEndpointUrls: 'https://service1.com',
      });
  
      expect(consolidatedProjects).toContainEqual({
        projectName: 'Project2',
        sourceCodeRepository: 'https://github.com/project2',
        containerRegistries: 'https://container1.com',
      });
    });
  });
  
