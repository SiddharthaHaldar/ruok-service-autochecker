import { spawn } from 'child_process';
import fs from 'fs';

// const tarFilePath = '/path/to/your/archive.tar';
const tarFilePath = 'https://github.com/knqyf263/trivy-ci-test '

// const trivy = spawn('trivy', [tarFilePath, '--format', 'json']);
// trivy -f json repo https://github.com/knqyf263/trivy-ci-test works in command line '--format', 'json'
// const trivy = spawn('trivy', ['repo', tarFilePath]);
// const trivy = spawn('trivy', ['repo', 'https://github.com/knqyf263/trivy-ci-test', '-f']);
const trivy = spawn('trivy', ['fs', '.', '-f', 'json']);


trivy.stdout.on('data', data => {
  console.log(`Trivy output: ${data}`);
  const vulnerabilities = JSON.parse(data);
  // Handle the vulnerabilities data as needed
});

trivy.stderr.on('data', data => {
  console.error(`Trivy error: ${data}`);
});

trivy.on('close', code => {
  if (code === 0) {
    console.log('Trivy scan completed successfully.');
  } else {
    console.error(`Trivy process exited with code ${code}`);
  }
});