var contextFactory = function (spec) {
  if (!spec.name) throw new Error('createContext(...): Class specification must have a `name` attribute.');
  
  return spec;
};

module.exports = contextFactory;