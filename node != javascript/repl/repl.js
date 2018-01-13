const repl = require('repl');

const r = repl.start({
  ignoreUndefined: true,
  replMode: repl.REPL_MODE_STRICT
});

r.context.lodash = require('lodash'); // đặt lodash vào context của repl, điều này có nghĩa là có thể sử dụng lodash trong repl