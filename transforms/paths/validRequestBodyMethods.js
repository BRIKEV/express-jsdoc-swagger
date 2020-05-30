
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

module.exports = validRequestBodyMethods;
