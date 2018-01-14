require = function() {
  return { mocked: true }
}

const fs = require('fs');

console.log(fs); // { mocked: true }
