<h1>Node != Javascript</h1>

<h2>V8 Engine and Libuv in Node.js</h2>

<h3>Hai điều quan trọng nhất trong Node.js là `V8 engine` và `libuv`</h3>
<p>Node có sử dụng một máy ảo để thực thi mã Javascript đó là <strong>V8 engine</strong></p>
<p>Điều đó có nghĩa là tất cả các tính năng có trong Javascript được thực thi bởi Node đều được hỗ trợ bởi V8 engine và được chuyển tới Node</p>
<p>Sự hỗ trợ này được quản lý với 3 nhóm tính năng đó là <strong>Shipping</strong>, <strong>Staged</strong> và <strong>In Progress</strong></p>
<p><strong>Shipping</strong> mặc định là được hỗ trợ và có thể dùng trong Node</p>
<p><strong>Stage</strong> và <strong>In Progress</strong> thì không được hỗ trợ mặc định mà phải dùng <strong>flag</strong>(--harmony) để sử dụng chúng</p>
<p>Những tính năng trong <strong>Shipping</strong> và <strong>Staged</strong> có thể chưa được ổn định nhưng nếu chúng ta thực sự muốn dùng thì có thể dùng cờ để có thể sử dụng được chúng</p>
<p>Nếu muốn xem những tính năng nào đang trong <strong>In Progress</strong> ở version Node hiện tại thì có thể dùng lệnh sau <strong>node --v8-options | grep 'in progress'</strong></p>
<p>Bạn có thể xem toàn bộ option của V8 engine bằng lệnh <strong>node --v8-options | less</strong></p>
 
<h2>Global in Node.js</h2>

<p>Muốn đặt một biến thành biến global trong Node.js, chúng ta chỉ cần sử dụng Global.<tên biến> và chúng ta có thể gọi biến đó trong mọi file mà chúng ta muốn</p>
<p>Trong Node có rất nhiều đối tượng Global, <strong>và bạn sẽ không phải là chuyên gia về Node nếu bạn không biết cách dùng một trong số những đối tượng global đó :))</strong></p>
<p>Hai đối tượng phổ biến trong Node là <strong>Buffer</strong> và <strong>process</strong></p>

<h3>Process</h3>
<p>Bạn có thể sử dụng lệnh <strong>node -p 'process.versions'</strong> để xem version của các dependency trong node</p>
<p><strong>process.env</strong> là bản sao của môi trường của người dùng</p>
<p>Bạn có thể xem môi trường của bạn bằng cách gõ <strong>env</strong> vào command line trong Linux hoặc <strong>set</strong> trong command line của window</p>
<p>Vấn đề bạn cần phải nhớ ở đây là nếu như bạn thay đổi trực tiếp <strong>env</strong> bằng cách gán <strong>process.env</strong> thì có nghĩa rằng bạn đang thay đổi trực tiếp môi trường và điều này là không nên làm</p>
<p>Nếu bạn muốn lấy một biến nào trong <strong>env</strong> thì bạn nên đặt tất cả các biến đó trong file config. Đây là một điều nên làm</p>
<p><strong>process.release.lts</strong> là một tính năng thú vị trong Node</p>
<p>Nếu như phiên bản Node bạn đang dùng là phiên bản LTS(Long Term Support) hoặc thấp hơn thì khi kiểm tra <strong>process.release.lts</strong> sẽ ra Codename của phiên bản đó còn nếu đó không phải là LTS version thì sẽ ra <strong>undefined</strong></p>
<p>Một trong những thứ hay ho của <strong>process</strong> trong Node là chúng ta có thể giao tiếp với môi trường</p>
<p>Để giao tiếp với môi trường, chúng ta sử dung <strong>stdin</strong> để đọc, <strong>stdout</strong> để in và <strong>stderr</strong> để hiển thị lỗi</p>
<p>Đối tượng <strong>process</strong> là một thể hiện của <strong>EventEmitter</strong>. Điều này có nghĩa là chúng ta có thể emit và listen sự kiện trong <strong>process</strong></p>

<h3>Buffer</h3>
<p>Buffer là một đối tượng được sử dụng thường xuyên trong Node và được sử dụng với dòng dữ liệu nhị phân</p>
