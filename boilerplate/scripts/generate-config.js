const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const populateVariables = (str) => str
  .replace(/APP_ID/g, packageJson.name)
  .replace(/APP_NAME/g, packageJson.waf_application_name)
  .replace(/APP_VERSION/g, packageJson.version);

const configFile = fs.readFileSync(
  path.join(__dirname, './config_template.xml')
).toString();
fs.writeFileSync(
  path.join(__dirname, '../public/config.xml'),
  populateVariables(configFile)
);

const setupFile = fs.readFileSync(
  path.join(__dirname, './setup_template.sh')
).toString();
fs.writeFileSync(
  path.join(__dirname, '../public/setup.sh'),
  populateVariables(setupFile)
);

const debugFilePath = path.join(__dirname, '../debug.js');
if (fs.existsSync(debugFilePath)) {
  eval(fs.readFileSync(debugFilePath).toString());
  const { LOCAL_COMPUTER_IP } = DEBUG_PARAMS;
  const debugFile = fs.readFileSync(
    path.join(__dirname, './debug_template.sh')
  ).toString();
  fs.writeFileSync(
    path.join(__dirname, '../public/debug.sh'),
    populateVariables(debugFile)
      .replace(/LOCAL_COMPUTER_IP/g, LOCAL_COMPUTER_IP)
  );
}
