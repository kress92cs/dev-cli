const findContainer = require('../helpers/find_container_in_list');

module.exports = (context, search) => {
  if (!context) {
    console.error('Missing context');
    return;
  }

  const match = findContainer(context, search);

  if (match) {
    console.log(`${context.root}/${match.name}`);
    return;
  }
  console.log(context.root);
};