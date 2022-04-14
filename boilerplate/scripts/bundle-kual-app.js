const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

fs.renameSync(
  path.join(__dirname, '../build'),
  path.join(__dirname, '..', packageJson.name)
);

fs.mkdirSync(path.join(__dirname, '../build'));
fs.mkdirSync(path.join(__dirname, '../build', packageJson.name));

fs.renameSync(
  path.join(__dirname, '..', packageJson.name),
  path.join(__dirname, '../build', packageJson.name, 'waf')
);

const populateVariables = (str) => str
  .replace(/APP_ID/g, packageJson.name)
  .replace(/APP_NAME/g, packageJson.waf_application_name)
  .replace(/APP_VERSION/g, packageJson.version);

const configFile = fs.readFileSync(
  path.join(__dirname, './template_config_kual.xml')
).toString();
fs.writeFileSync(
  path.join(__dirname, '../build', packageJson.name, 'config.xml'),
  populateVariables(configFile)
);

const menuFile = fs.readFileSync(
  path.join(__dirname, './template_menu.json')
).toString();
fs.writeFileSync(
  path.join(__dirname, '../build', packageJson.name, 'menu.json'),
  populateVariables(menuFile)
);

const runFile = fs.readFileSync(
  path.join(__dirname, './template_run.sh')
).toString();
fs.writeFileSync(
  path.join(__dirname, '../build', packageJson.name, 'run.sh'),
  populateVariables(runFile)
);
