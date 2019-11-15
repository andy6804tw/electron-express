const {
    ipcRenderer
  } = require('electron'),
    expressAppUrl = "http://127.0.0.1:3000",
    spawn = require("child_process").spawn,
    node = spawn("../node", ["./Radar-Server/dist/index.js"], {
      cwd: process.cwd()
    })