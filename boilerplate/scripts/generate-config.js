const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const populateVariables = (str) => str
  .replace(/APP_ID/g, packageJson.name)
  .replace(/APP_NAME/g, packageJson.waf_application_name)
  .replace(/APP_VERSION/g, packageJson.version);

const configFile = fs.readFileSync(
  path.join(__dirname, './template_config_waf.xml')
).toString();
fs.writeFileSync(
  path.join(__dirname, '../public/config.xml'),
  populateVariables(configFile)
);
