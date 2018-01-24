const fs = require('fs');

const readFileAsArray = function(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function(err, data) {
      if (err) {
        return reject(err);
      }

      const lines = data.toString().trim().split('\n');

      return resolve(lines);
    });
  })
};

// example call
readFileAsArray('./numbers')
  .then(lines => {
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(number => number % 2 === 1);
    console.log(`Odd numbers count: ${oddNumbers.length}`);
  })
  .catch(err => console.error(err));


/*
  Thay vì truyền một callback như một tham số, chúng ta sẽ thực hiện .then sau lời gọi function
  Function then sẽ cho chúng ta quyền truy cập vào mảng lines, và chúng ta có thể xử lý chúng như khi chúng
  ta gọi callback
  Để bắt lỗi từ async function trả về, chúng ta sẽ dùng hàm .catch. Hàm này sẽ nhận một tham số đó là error
  Trong function async chúng ta sẽ trả về một Promise, function Promise bao gồm 2 tham số, đó là resolve và
  reject
*/
