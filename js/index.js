const request = require("request");
const key = require("keymaster")
const { ipcRenderer } = require('electron');
const spawn = require("child_process").spawn
let node;
const env = Object.create( process.env );

ipcRenderer.on('stop-server', (event, data) => {
  node.kill('SIGINT');
});

const addData=()=>{
  const loading=document.getElementById("loading");
  const topic=document.getElementById("input_topic").value;
  const port=document.getElementById("input_port").value;
  env.PORT = port;
  env.NODE_ENV='development';
  node = spawn("node", ["./api/dist/index.js"], { cwd: process.cwd(), env: env });
  redirectOutput(node.stdout);
  redirectOutput(node.stderr);
  loading.classList.remove("d-none");
  checkServer(`http://127.0.0.1:${port}`)
  console.log(port);
}

const checkServer=(url)=>{
  let checkServerRunning = setInterval(() => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        loading.classList.add("d-none");
        clearInterval(checkServerRunning);
      }
    });
  }, 1000);
}

/** Log */
const serverLog=document.getElementById("serverLog");
function strip(s) {
  return s.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

function redirectOutput(x) {
  let lineBuffer = "";

  x.on('data', function (data) {
    lineBuffer += data.toString();
    let lines = lineBuffer.split("\n");

    lines.forEach( (l) => {
      if (l !== "") {
        const div=document.createElement('div');
        div.innerText=strip(l);
        serverLog.append(div);
      }
    });

    lineBuffer = lines[lines.length - 1];
  });
}

/**  */
key("f1", () => {
  console.log('f1');
  // ipcRenderer.webContents.openDevTools();
  ipcRenderer.send('openDevTools', true);
});