# Practical Example: Task List Manager

Chúng ta sẽ cùng tạo một ví dụ sử dụng **event emitter**. Chúng ta sẽ làm một ứng dụng quản lý quản lý công việc đơn giản

Chúng ta sẽ giữ cho cấu trúc file thật đơn giản, chúng ta sẽ có một file **client** và một file **server**. Trong đó **client** sẽ đăng ký một sự kiện **command** cho **server** và **server** sẽ đăng ký một sự kiện **response** cho **client**

Chúng ta sẽ làm cho nó hỗ trợ 4 **command**, **help** để hiển thị danh sách **command**, **ls** để hiển thị những task hiện tại, **add** để thêm một task mới, và **delete** để xóa task

Để bắt đầu, chúng ta hãy tạo một file client.js và một file server.js. Chúng ta sẽ cần phải require **event emitter** trong cả hai file đó

Trong file client.js, chúng ta cần đọc input từ người dùng, vì vậy chúng ta cần require module **readline**, chúng ta sẽ tạo một giao diện với một input và output stream, chúng ta sẽ sử dụng **process standard in** và **process standard out**. **Event emitter** trong ở phía client sẽ đơn giản

<img src="https://github.com/29ff/advanced_node/blob/master/Node's%20Event-driven%20Architecture/images/practical1.png">