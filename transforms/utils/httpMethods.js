const validRequestBodyMethods = {
  get: false,
  delete: false,
  head: false,
  post: true,
  put: true,
  connect: true,
  options: true,
  trace: true,
  patch: true,
};

const validHTTPMethod = method => Object.keys(validRequestBodyMethods).includes(method);

module.exports = {
  validRequestBodyMethods,
  validHTTPMethod,
};
