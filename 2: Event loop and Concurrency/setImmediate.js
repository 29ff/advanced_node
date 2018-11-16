const fs = require('fs')

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('Time out')
  }, 0);

  setImmediate(() => {
    console.log('setImmediate')
  })
})

/* output */
// setImmediate
// Time out