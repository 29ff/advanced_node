process.on('exit', (code) => {
  // đây là sự kiện khi node exit
  // những đoạn code dưới đây sẽ thực hiện trước khi node exit

  console.log(`Node exited with code ${code}`);
})

process.on('uncaughtException', (err) => {
  // sự kiện này để lắng nghe nếu có lỗi xảy ra
  // thực hiện clean khi có lỗi ở đây

  console.error(err); // không nên chỉ log ra lỗi như thế này

  // nên buộc cho chương trình dừng nữa
  process.exit(1); // tham số truyền vào là exit code
})

// đoạn này sẽ giữ cho node chạy và không dừng
process.stdin.resume();

// đoạn này sẽ trả về err
console.dog();

// CHẠY THỬ CHƯƠNG TRÌNH ĐỂ XEM KẾT QUẢ