const { spawn } = require('child_process');
const { join } = require('path');

const lipcScriptDir = join(__dirname, './lipc.lua');


var luaProcess;
var startCount = 0;
const startLua = () => {
  console.log('startLua');
  if (startCount === 10) return;
  luaProcess = spawn('lua', [lipcScriptDir]);
  luaProcess.stdout.setEncoding('utf8');
  luaProcess.stdout.on('data', function(data) {
    try {
      const json = JSON.parse(data.toString());
      console.log(json);
    } catch (e) {
      console.error(e);
    }
  });
  luaProcess.on('spawn', () => console.log('lua process spawned'));
  luaProcess.on('error', (e) => console.error(e));
  luaProcess.on('close', () => setTimeout(startLua, 3000));
  startCount++;
}
startLua();


const cleanExit = function() {
  if (luaProcess && !luaProcess.killed) {
    luaProcess.kill(9);
  }
  process.exit();
};
process.on('SIGINT', cleanExit); // catch ctrl-c
process.on('SIGTERM', cleanExit); // catch kill
