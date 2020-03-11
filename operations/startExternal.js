const shell = require('shelljs');

module.exports = (context, container) => {
  const config = context.external[container];

  const cmd = `docker run -d ${config.port ? '-p ' + config.port : ''} ${config.volume ? '-v ' + context.root + '/' + config.volume : ''} --network ${context.name} --name ${container} ${config.image}`;
  shell.echo(cmd)
  shell.exec(cmd);
};