const dns = require('dns')

// dns.lookup('bluutech.com', (err, address) => {
//   console.log(address)
// })

// dns.resolve4('bluutech.co', (err, address) => {
//   console.log(address)
// })

dns.resolveCname('bluutech.co', (err, address) => {
  console.log(address)
})
