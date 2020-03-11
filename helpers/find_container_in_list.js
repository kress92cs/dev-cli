const findContainer = (context, search) => {
  const match = context.containers.find((container) => {
    if(container.name.indexOf(search) > -1) {
      return true;
    }
    return false;
  });
  return match;
};

module.exports = findContainer;
