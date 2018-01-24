const fs = require('fs');

const readFileAsArray = function(file, callback) {
  fs.readFile(file, function(err, data) {
    if (err) {
      return callback(err);
    }

    const lines = data.toString().trim().split('\n');

    callback(null, lines);
  });
};

// example call
readFileAsArray('./numbers', (err, lines) => {
  if (err) throw err;

  const numbers = lines.map(Number);
  const oddNumbers = numbers.filter(number => number % 2 === 1);
  console.log(`Odd numbers count: ${oddNumbers.length}`)
});

/*
  Function ReadFileAsArray nhận một filepath và một callback, sau đó tiến hành đọc file, cắt nó ra thành
  một mảng các chuỗi
  Sau đó gọi đến một callback với array đó. File này là ví dụ về việc sử dụng callback
  Chúng ta sử dụng nó cho một file gồm các số, chuyển một mảng các chuỗi thành những số, và tính ra những số
  lẻ. Chỉ một ví dụ đơn giản về việc sử dụng callback. Đây là cách sử dụng callback hoàn toàn thuần túy trong Node
  Callback có một tham số đầu tiên đó là err và nó có thể null, và chúng ta đẩy một callback như là tham số cuối cùng function chính. Luôn luôn phải làm như vậy cho function của bạn, bởi vì cộng đồng Node luôn luôn quy định như thế . Vì vậy chúng ta không được truyền callback như là tham số đầu tiên hoặc đổi chỗ error và callback
*/
