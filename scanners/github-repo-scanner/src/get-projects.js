// Temporary solution - placeholder to get projects to start scan. Will be pulled from 
// dns repo, and stored in arrangoDB in the future

import * as fs from 'fs';

export function tempGetProjects() {
  const filePath = "../service-discovery/known-service-list.json";
  try {
    const jsonContents = fs.readFileSync(filePath, 'utf8');
    const projects = JSON.parse(jsonContents);
    // console.log(projects)
    return projects;
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error);
    return null;
  }
}
// tempGetProjects()

// const projects = tempGetProjects();
// if (projects) {
//   console.log('Projects:', projects);
// } else {
//   console.log('Failed to retrieve projects.');
// }








