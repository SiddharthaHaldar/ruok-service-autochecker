import { writeFile } from 'fs/promises';
import path from 'path';
import { ContainerAnalysisClient } from '@google-cloud/containeranalysis';
import { GoogleAuth } from 'google-auth-library'

/**
* Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
* this library will automatically choose the right client based on the environment.
*/
// enable API

const PROJECT_ID = 'phx-01h1yptgmche7jcy01wzzpw2rf'

async function main() {
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform'
  });
  const client = await auth.getClient();
  const projectId = await auth.getProjectId();
//   const url = `https://dns.googleapis.com/dns/v1/projects/${PROJECT_ID}`;
  const url = 'https://northamerica-northeast1-docker.pkg.dev/phx-01h1yptgmche7jcy01wzzpw2rf/hello-world-app2/hello-world-three'
  const res = await client.request({ url });
//   console.log(res.data);
}

main().catch(console.error);

const getVulnerabilitiesForImage = async (imageUrl) => {
  try {
    const client = new ContainerAnalysisClient();
    // const projectId = 'phx-01h1yptgmche7jcy01wzzpw2rf';

    const formattedParent = client.getGrafeasClient().projectPath(PROJECT_ID);

    const [occurrences] = await client.getGrafeasClient().listOccurrences({
      parent: formattedParent,
      filter: `resourceUrl = "${imageUrl}"`,
    });

    if (occurrences.length) {
      console.log(`Occurrences for ${imageUrl}:`);
      occurrences.forEach(occurrence => {
        console.log(`${occurrence.name}:`);
        console.log(occurrence);
      });
    } else {
      console.log('No occurrences found for the specified image.');
    }
  } catch (error) {
    console.error('Error retrieving vulnerabilities:', error);
  }
};

const writeVulnToJsonFile = async (vulnText, filePath) => {
  try {
    await writeFile(filePath, vulnText, 'utf8');
    console.log(`Vulnerability information saved to: ${filePath}`);
  } catch (err) {
    console.error('Error writing JSON file:', err);
  }
};

const imageUrl = 'https://northamerica-northeast1-docker.pkg.dev/phx-01h1yptgmche7jcy01wzzpw2rf/hello-world-app2/hello-world-three';

getVulnerabilitiesForImage(imageUrl);