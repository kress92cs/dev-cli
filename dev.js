#!/usr/bin/env node

const getArgs = require('./helpers/get_args');
let context;
try {
  const getDevRoot = require('./helpers/get_dev_root');
  context = getDevRoot();
} catch (err) {
  console.log(err.message);
  process.exit(4);
}

const operations = require('./operations');
const args = getArgs();

if (args.operation) {
  if (operations[args.operation]) {
    operations[args.operation].apply(null, [context].concat(args.options));
  } else {
    console.error('Invalid operation: ' + args.operation + '. (Available operations are: ' + Object.keys(operations).join(', ') + ')');
  }
} else {
  console.log(context, args);
}
