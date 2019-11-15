// clone the actual env vars to avoid overrides
var env = Object.create(process.env);
env.NODE_ENV = 'development';

const electron = require("electron"),
  proc = require("child_process"),
  child = proc.spawn('electron', ["."], { env: env });
