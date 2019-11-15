var env = Object.create( process.env );
env.PORT = 3006;
env.NODE_ENV='development';
const { ipcRenderer } = require('electron');
const expressAppUrl = "http://127.0.0.1:3006";
const spawn = require("child_process").spawn
const node = spawn("node", ["./api/dist/index.js"], { cwd: process.cwd(), env: env });


ipcRenderer.on('stop-server', (event, data) => {
node.kill('SIGINT');
});