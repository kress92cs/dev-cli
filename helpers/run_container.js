const shell = require('shelljs');

const runContainer = (context, containerConfig) => {
  const workingDir = `${context.root}/${containerConfig.name}`;
  let port = containerConfig.port;
  if (typeof containerConfig.port == 'number' || port.indexOf(':') === -1) {
    port = `${port}:3000`;
  }
  const cmd = `docker run -dp ${port} -v ${workingDir}:/app --network ${context.name} --name ${containerConfig.name} ${containerConfig.name} npm run dev`;

  shell.echo(cmd);
  shell.exec(cmd);
};

module.exports = runContainer;