const operations = {
  git: require('./git'),
  build: require('./build'),
  run: require('./run'),
  stop: require('./stop'),
  cd: require('./cd'),
  createNetwork: require('./createNetwork'),
  startExternal: require('./startExternal'),
  c: require('./c'),
};

module.exports = operations;
