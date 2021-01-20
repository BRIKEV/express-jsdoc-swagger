const errorMessage = require('./errorMessage');

const formatExample = example => {
  try {
    return JSON.parse(example);
  } catch (err) {
    errorMessage(`example: ${example} - malformed`);
    return example;
  }
};

module.exports = formatExample;
