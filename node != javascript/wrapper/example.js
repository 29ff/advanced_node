require('./caching')(); // require lần 1 sẽ thực thi file caching.js và cache lại

// console.log(require.cache); // xem file đang được cache
// delete require.cache['/Users/admin/Documents/advanced_node/node != javascript/wrapper/caching.js']; // xóa cache nhưng không day dùng cách này

require('./caching')(); // require lại lần 2 sẽ không thực thi file caching.js nữa chính vì vậy nội dung file chỉ hiển thị 1 lần

// cách giải quyết ở đây là export ra một function, sau đó mỗi lần require sẽ thực thi function đó như ví dụ phía trên