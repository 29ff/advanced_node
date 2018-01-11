# NODE != JAVASCRIPT

<h3>V8 Engine and Libuv in Node.js</h3>

<h4>Hai điều quan trọng nhất trong Node.js là `V8 engine` và `libuv`</h4>
<p>Node có sử dụng một máy ảo để thực thi mã Javascript đó là <strong>V8 engine</strong></p>
<p>Điều đó có nghĩa là tất cả các tính năng có trong Javascript được thực thi bởi Node đều được hỗ trợ bởi V8 engine và được chuyển tới Node</p>
<p>Sự hỗ trợ này được quản lý với 3 nhóm tính năng đó là <strong>Shipping</strong>, <strong>Staged</strong> và <strong>In Progress</strong></p>
<p><strong>Shipping</strong> mặc định là được hỗ trợ và có thể dùng trong Node</p>
<p><strong>Stage</strong> và <strong>In Progress</strong> thì không được hỗ trợ mặc định mà phải dùng <strong>flag</strong>(--harmony) để sử dụng chúng</p>
<p>Những tính năng trong <strong>Shipping</strong> và <strong>Staged</strong> có thể chưa được ổn định nhưng nếu chúng ta thực sự muốn dùng thì có thể dùng cờ để có thể sử dụng được chúng</p>
<p>Nếu muốn xem những tính năng nào đang trong <strong>In Progress</strong> ở version Node hiện tại thì có thể dùng lệnh sau <em>node --v8-options | grep 'in progress'</em></p>
<p>Bạn có thể xem toàn bộ option của V8 engine bằng lệnh <em>node --v8-options | less</em></p>
 
<h3>Global in Node.js</h3>
<p>Muốn đặt một biến thành biến global trong Node.js, chúng ta chỉ cần sử dụng Global.<tên biến> và chúng ta có thể gọi biến đó trong mọi file mà chúng ta muốn</p>
<p>Trong Node có rất nhiều đối tượng Global, <strong>và bạn sẽ không phải là chuyên gia về Node nếu bạn không biết các dùng một trong số những đối tượng global đó :))</strong></p>