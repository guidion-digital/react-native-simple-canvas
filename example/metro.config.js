const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add additional node_modules paths
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, './node_modules'),
  path.resolve(__dirname, '../node_modules'),
];

// Add watch folders to monitor changes in the parent dist directory
config.watchFolders = [
  path.resolve(__dirname, '../dist'),
];

module.exports = config; 