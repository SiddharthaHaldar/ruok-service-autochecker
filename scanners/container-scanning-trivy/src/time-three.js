// // const https = require('https');
// // const { GoogleAuth } = require('google-auth-library');
import { GoogleAuth } from 'google-auth-library'
import https from 'https'
import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();
// // const { GoogleAuth } = require('google-auth-library');

// // const getBearerToken = async () => {
// //   try {
// //     const auth = new GoogleAuth();
// //     const client = await auth.getIdTokenClient('https://www.googleapis.com/auth/cloud-platform');
// //     const { token } = await client.getRequestHeaders();
// //     console.log('Bearer token:', token);
// //   } catch (error) {
// //     console.error('Error fetching Bearer token:', error);
// //   }
// // };

// // getBearerToken();

import fs from 'fs'

// const jsonCredentialsPath = '../.env'
// const credentials = JSON.parse(fs.readFileSync(jsonCredentialsPath, 'utf8'));
const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const targetAudience = 'your-target-audience'; // Set the target audience

const token = process.env.GOOGLE_ACCESS_TOKEN

// async function getIdTokenFromServiceAccount() {
//   const auth = new GoogleAuth({credentials});

//   // Get an ID token client.
//   // The client can be used to make authenticated requests or you can use the
//   // provider to fetch an id token.
//   const client = await auth.getIdTokenClient();
//   await client.idTokenProvider.fetchIdToken();

//   console.log('Generated ID token.');
// }

// getIdTokenFromServiceAccount();
// // [END auth_cloud_idtoken_service_account]
// }
const getVulnerabilitySummary = async () => {
  try {
    const auth = new GoogleAuth();
    const client = await auth.getIdTokenClient('https://www.googleapis.com/auth/cloud-platform');
    const { token } = await client.getRequestHeaders();

    const options = {
      hostname: 'containeranalysis.googleapis.com',
      path: '/v1/projects/PROJECT_ID/occurrences:vulnerabilitySummary',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const req = https.request(options, (res) => {
      let data = ''; 

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('Vulnerability Summary:', JSON.parse(data));
      });
    });

    req.on('error', (error) => {
      console.error('Error fetching vulnerability summary:', error);
    });

    req.end();
  } catch (error) {
    console.error('Error fetching vulnerability summary:', error);
  }
};

// Call the function to get vulnerability summary
getVulnerabilitySummary();

// import { GoogleAuth } from 'google-auth-library';
// import https from 'https';
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// const targetAudience = 'your-target-audience'; // Set the target audience
// const projectID = 'your-project-id'; // Replace with your actual project ID

// const getBearerToken = async () => {
//   try {
//     const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
//     const client = await auth.getIdTokenClient();
//     const { token } = await client.getRequestHeaders();
//     return token;
//   } catch (error) {
//     console.error('Error fetching Bearer token:', error);
//     return null;
//   }
// };

// const getVulnerabilitySummary = async () => {
//   try {
//     const token = await getBearerToken();

//     if (!token) {
//       console.error('Could not retrieve Bearer token.');
//       return;
//     }

//     const options = {
//       hostname: 'containeranalysis.googleapis.com',
//       path: `/v1/projects/${projectID}/occurrences:vulnerabilitySummary`,
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     };

//     const req = https.request(options, (res) => {
//       let data = '';

//       res.on('data', (chunk) => {
//         data += chunk;
//       });

//       res.on('end', () => {
//         console.log('Vulnerability Summary:', JSON.parse(data));
//       });
//     });

//     req.on('error', (error) => {
//       console.error('Error fetching vulnerability summary:', error);
//     });

//     req.end();
//   } catch (error) {
//     console.error('Error fetching vulnerability summary:', error);
//   }
// };

// // Call the function to get vulnerability summary
// getVulnerabilitySummary();