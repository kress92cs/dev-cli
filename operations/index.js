const collection = require('./collection');
const operations = {
  clone: require('./clone'),
  pull: require('./pull'),
  build: require('./build'),
  run: require('./run'),
  stop: require('./stop'),
  cd: require('./cd'),
  createNetwork: require('./createNetwork'),
  startExternal: require('./startExternal'),
  c: collection,
  collection,
};

module.exports = operations;
