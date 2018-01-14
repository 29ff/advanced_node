const print = (stars, header) => {
  console.log('*'.repeat(stars));
  console.log(header);
  console.log('*'.repeat(stars));
}

if (require.main === module) { // nếu chạy từ command line
  print(process.argv[2], process.argv[3]);
} else { // nếu chạy từ require của file khác (dùng file index.js để test)
  module.exports = print;
}