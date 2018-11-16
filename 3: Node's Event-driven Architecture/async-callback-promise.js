const fs = require('fs');

const readFileAsArray = function(file, callback = () => {}) { // add default value for callback function
  return new Promise((resolve, reject) => {
    fs.readFile(file, function(err, data) {
      if (err) {
        reject(err) // add this line
        return callback(err); // keep this line
      }

      const lines = data.toString().trim().split('\n');
      resolve(lines) // add this line
      callback(null, lines); // keep this line
    });
  })
};

// promise call
readFileAsArray('./numbers')
  .then(lines => {
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(number => number % 2 === 1);
    console.log(`Odd numbers count: ${oddNumbers.length}`);
  })
  .catch(err => console.error(err));

  // callback call
readFileAsArray('./numbers', (err, lines) => {
  if (err) throw err;

  const numbers = lines.map(Number);
  const oddNumbers = numbers.filter(number => number % 2 === 1);
  console.log(`Odd numbers count: ${oddNumbers.length}`)
});

/*
  Khi chúng ta sử dụng cách này, có một điều chúng ta cần làm đó là add giá trị mặc định cho callback
  trong trường hợp code của bạn muốn sử dụng với promise interface
  Khi chạy file này, code sẽ hoạt động theo cả 2 cách là callback và promise
  Sử dụng
*/
