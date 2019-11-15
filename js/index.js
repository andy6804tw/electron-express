const request = require("request");
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