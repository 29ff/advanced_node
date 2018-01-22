const fs = require('fs');

function fileSize(filename, callback) {
  if (typeof filename !== 'string') {
    // return callback(new TypeError('Argument should be a string'))
    return process.nextTick(
      callback,
      new TypeError('The argument should be a string')
    )
  }

  fs.stat(filename, (err, stats) => {
    if (err) {
      return callback(err)
    }

    callback(null, stats.size)
  })
}

fileSize(__filename, (err, size) => {
  if (err) {
    throw err
  }

  console.log(`Size in KB: ${size/1024}`)
})

console.log('Hello!');

/*
Trong file này, function fileSize nhận một filename và một callback
Đầu tiên, nó validate để đảm bảo filename là một string và nó sẽ trả ra lỗi cho callback nếu không phải là string
Sau đó, nó thực thi function fs.stat và trả lại filesize cho callback
Sau đó, chúng ta chạy function fileSize
Hello! sẽ được in ra trước vì function fileSize là một async function. fileSize là async vì trong đó có function fs.stat là async
Nhưng nó có một vấn đề, khi thay đổi filename truyền vào function là một số. Lúc này function sè validate và nhận ra filenamne không phải là một string và sẽ hiển thị thông báo lỗi. Thế nhưng lúc này, dòng console.log('Hello!') không được thực thi nữa. Lí do đơn giản là vì đoạn code validate filename là sync. Do đó, function fileSize có thể là sync hoặc async tùy thuộc vào tham số đầu tiên truyền vào. Đây là một vấn đề trong thiết kế function. Một function không nên vừa là sync và vừa là async.
Để giải quyết vấn đề này, chúng ta có thể thêm process.nextTick vào đoạn callback trả về lỗi và function sẽ hoàn toàn là function async
*/