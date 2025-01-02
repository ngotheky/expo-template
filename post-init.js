const fs = require("fs");
const path = require("path");

const envPath = path.resolve(__dirname, "./.env");
const envDevPath = path.resolve(__dirname, "./.env.development");
const envStagingPath = path.resolve(__dirname, "./.env.staging");
const envProdPath = path.resolve(__dirname, "./.env.production");

const projectName = path.basename(process.cwd());

let envContent = fs.readFileSync(envPath, "utf-8");
let envDevContent = fs.readFileSync(envDevPath, "utf-8");
let envStagingContent = fs.readFileSync(envStagingPath, "utf-8");
let envProdContent = fs.readFileSync(envProdPath, "utf-8");

envContent = envContent.replace(/{{{projectName}}}/g, projectName);
envDevContent = envDevContent.replace(
  /{{{projectName}}}/g,
  `${projectName} Dev`
);
envStagingContent = envStagingContent.replace(
  /{{{projectName}}}/g,
  `${projectName} Staging`
);
envProdContent = envProdContent.replace(
  /{{{projectName}}}/g,
  `${projectName} Production`
);

fs.writeFileSync(envPath, envContent, "utf-8");
fs.writeFileSync(envDevPath, envDevContent, "utf-8");
fs.writeFileSync(envStagingPath, envStagingContent, "utf-8");
fs.writeFileSync(envProdPath, envProdContent, "utf-8");

console.log(`✅ Created .env with APP_NAME=${projectName}`);
