const os = require('os');
const fs = require('fs');
const rimraf = require('rimraf');
require('dotenv').config();
require('events').EventEmitter.defaultMaxListeners = 20;

// install pre commit linter, evaluate your code automaticly before commit
const preCommitLinter = () => {
  try {
    const gitPath = `${__dirname}/.git`;
    rimraf.sync(`${gitPath}/hooks/pre-commit.sample`);
    rimraf.sync(`${gitPath}/hooks/pre-commit`);
    fs.copyFileSync(`${__dirname}/pre-commit`, `${gitPath}/hooks/pre-commit`);
    fs.chmodSync(`${gitPath}/hooks/pre-commit`, '755');
    console.log(`Pre-commit installed`);
  } catch (error) {
    console.log(error)
  }
};

const postInstallMac = () => {
  preCommitLinter();
};

const postInstall = () => {
  preCommitLinter();
};

console.log("Reconfiguring Framework, OS Detected:");

switch (os.type()) {
  case "Darwin":
    console.log("MacOS");
    postInstallMac();
    break;

  case "Windows_NT":
    console.log("Windows");
    postInstall();
    break;
  case "Linux":
    console.log("Linux");
    postInstall();
    break;

  default:
    console.log(`Unknown Platform not supported`);
}