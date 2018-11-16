const path = require('path');

console.log(`Resolve: ${path.resolve('foo', 'bar')}`); // aboslute path

console.log(`Join: ${path.join('foo', '/bar', './baz')}`); // relative path