# Practical Example: Task List Manager

Chúng ta sẽ cùng tạo một ví dụ sử dụng **event emitter**. Chúng ta sẽ làm một ứng dụng quản lý quản lý công việc đơn giản

Chúng ta sẽ giữ cho cấu trúc file thật đơn giản, chúng ta sẽ có một file **client** và một file **server**. Trong đó **client** sẽ đăng ký một sự kiện **command** cho **server** và **server** sẽ đăng ký một sự kiện **response** cho **client**

Chúng ta sẽ làm cho nó hỗ trợ 4 **command**, **help** để hiển thị danh sách **command**, **ls** để hiển thị những task hiện tại, **add** để thêm một task mới, và **delete** để xóa task

Để bắt đầu, chúng ta hãy tạo một file client.js và một file server.js. Chúng ta sẽ cần phải require **event emitter** trong cả hai file đó

Trong file client.js, chúng ta cần đọc input từ người dùng, vì vậy chúng ta cần require module **readline**, chúng ta sẽ tạo một giao diện với một input và output stream, chúng ta sẽ sử dụng **process standard in** và **process standard out**. **Event emitter** trong ở phía client sẽ đơn giản. Chúng ta sẽ không cần phải tạo nhiều logic code ở đây. Chúng ta sẽ tạo một đối tượng từ **event emitter** và file client.js có nội dung như sau:

<img src="https://github.com/29ff/advanced_node/blob/master/Node's%20Event-driven%20Architecture/images/practical1.png">

Trong file server.js, chúng ta sẽ require **event emitter** và tạo một class **Server** kế thừa từ **event emitter**. Sau đó, chúng ta sẽ export một instance của class vừa tạo. File server.js sẽ như sau:

<img src="https://github.com/29ff/advanced_node/blob/master/Node's%20Event-driven%20Architecture/images/practical2.png">

Sau đó, chúng ta import file server.js trong client.js

<img src="https://github.com/29ff/advanced_node/blob/master/Node's%20Event-driven%20Architecture/images/practical3.png">

Khi chúng ta muốn tạo một ứng dụng giao tiếp 2 chiều, cả 2 file đều cần phải truy cập lẫn nhau. Client sẽ emit sự kiện cho server, và server sẽ lắng nghe các sự kiện đó. Vì vậy trong file client.js, chúng ta đã tạo truy cập tới đối tượng server, vì chúng ta đã require chúng trong client. Chúng ta có thể làm điều tương tự với client, nhưng một cách khác, chúng ta có thể cho server export một function và thực thi function trong client, với tham số là client, và điều này cho phép chúng ta thực thi function trong server

<img src="https://github.com/29ff/advanced_node/blob/master/Node's%20Event-driven%20Architecture/images/practical4.png">

Trong file server.js, thay vì export một object, chúng ta sẽ export một function, và function này nhận vào tham số client. Điều này cho phép chúng ta khởi tạo đối tượng Server từ client

<img src="https://github.com/29ff/advanced_node/blob/master/Node's%20Event-driven%20Architecture/images/practical5.png">