const fs = require('fs');
const path = require('path');

// Read the main package.json
const packagePath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Create a new package.json for dist
const distPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  main: './index.js',
  types: './index.d.ts',
  author: packageJson.author,
  license: packageJson.license,
  description: packageJson.description,
  keywords: packageJson.keywords,
  repository: packageJson.repository,
  dependencies: packageJson.dependencies,
  peerDependencies: packageJson.peerDependencies
};

// Write the package.json to dist folder
const distPath = path.join(__dirname, '..', 'dist', 'package.json');
fs.writeFileSync(distPath, JSON.stringify(distPackageJson, null, 2));

console.log('✅ package.json copied to dist with dependencies');
