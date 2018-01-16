const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk != null) {
    const buffer = Buffer.from([chunk]);
    console.log('With .toString(): ', buffer.toString());
    console.log('With StringDecoder: ', decoder.write(buffer));
  }
});

/*
  Khi chúng ta chạy file này, và nhập vào một ký tự không được xác định như `0xE2` hoặc `0x82` thì phương thức
  toString() sẽ hiển thị một biểu tượng lỗi, nhưng với StringDecoder nó sẽ không hiển thị gì cả
  Khi chúng ta nhập vào một ký tự Euro (0xAC) thì với phương thức toString() vẫn sẽ hiển thị ra biểu tượng lỗi,
  còn với StringDecoder sẽ hiển thị đúng ký hiệu Euro
*/
