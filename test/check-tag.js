// check-tag.js
const core = require('@actions/core');
const { execSync } = require('child_process');
const packageJson = require('../package.json');

try {
  const TAG = packageJson.version;
  execSync(`git show-ref --tags --verify --quiet refs/tags/v${TAG}`);
  console.log(`Tag v${TAG} already exists.`);
  core.setFailed(`Tag v${TAG} exists. Kindly update the version.`);
  process.exit(1);
} catch (error) {
  console.log('Tag does not exist, proceeding with tests...');
}
