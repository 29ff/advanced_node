const fs = require('fs');

const readFileAsArray = function(file, callback = () => {}) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function(err, data) {
      if (err) {
        reject(err);
        return callback(err);
      }

      const lines = data.toString().trim().split('\n');
      resolve(lines);
      callback(null, lines);
    });
  })
};

async function countOdd() {
  try {
    const lines = await readFileAsArray('./numbers');
    const numbers = lines.map(Number);
    const addCount = numbers.filter(number => number % 2 === 1).length;
    console.log(`Odd numbers count: ${addCount}`);
  } catch(err) {
    console.error(err);
  }
}

countOdd();


/*
  async function không có gì khác một function bình thường ngoại trừ nó sẽ có một từ khóa async phía trước
  Bên trong một async function, chúng ta sẽ gọi đến function readFileAsArray với từ khóa await
  Từ khóa await sẽ đợi cho đến khi function readFileAsArray trả về kết quả và gán kết quả trả về vào biến lines
*/
