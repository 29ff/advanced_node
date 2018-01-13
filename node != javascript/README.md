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
<em>Có thể xem trong thư mục <strong>process</strong> để  xem demo về event trong process</em>

<h3>Buffer</h3>
<p><strong>Buffer</strong> là một đối tượng được sử dụng thường xuyên trong Node và được sử dụng với dòng dữ liệu nhị phân</p>
<p>Một <strong>Buffer</strong> thực chất là một phần của bộ nhớ được cấp bên ngoài V8 và chúng ta có thể đưa dữ liệu vào đó</p>
<p>Data đó có thể được thông dịch bằng rất nhiều cách dựa vào ecoding</p>
<p>Bởi vì với dữ liệu <strong>Buffer</strong>, chúng ta không có bất cứ một kiểu encoding nào. Vì vậy để đọc được nó, chúng ta cần xác định một kiểu encoding cụ thể</p>
<p><strong>Buffer</strong> là một kiểu dữ liệu bậc thấp trong cấu trúc dữ liệu đại diện của dữ liệu nhị phân. Và không giống như array, một khi <strong>Buffer</strong> được cấp phát trong bộ nhớ, nó không thể bị thay đổi</p>
<p>Tạo Buffer từ có ba cách: <strong>Buffer.from(array|string)</strong>, <strong>Buffer.alloc(size)</strong>, <strong>Buffer.allocUnsafe(size)</strong></p>
<p>Sự khác nhau giữa <strong>Buffer.alloc()</strong> và <strong>Buffer.allocUnsafe()</strong> là với <strong>Buffer.alloc()</strong> thì Buffer này đã được fill còn <strong>Buffer.allocUnsafe()</strong> thì Buffer chưa được fill</p>
<p>Để fill một <strong>Buffer</strong> thì dùng {Buffer}.fill()</p>
<p><strong>Buffer</strong> hữu ích khi chúng ta cần đọc những thứ như ảnh từ một <strong>TCP Stream</strong> hoặc là một file nén hoặc bất kỳ hình thức truy cập dữ liệu nhị phân nào khác</p>
<p>Giống như array hoặc string, với Buffer chúng ta có thể sử dụng các hàm như <strong>includes</strong>, <strong>indexOf</strong> và <strong>slice</strong>. Nhưng sẽ có một số khác biệt với những phương thức này khi chúng ta sử dụng với Buffer</p>
<p>Ví dụ: Khi chúng ta sử dụng slice để cắt một Buffer, Buffer đã được cắt sẽ chia sẻ cùng bộ nhớ với Buffer ban đầu (xem file <strong>buffer.slice.js</strong> trong folder buffer)</p>
<p>Một ghi chú cuối cùng cho Buffer, khi convert stream của binary data, chúng ta có thể sử dụng module <strong>string_decoder</strong> bới vì nó xử lý kiểu dữ liệu multibyte tốt hơn, đặc biệt là dữ liệu multibyte không đầy đủ</p>
<p><strong>string_decoder</strong> giữ những dữ liệu dạng multibyte và mã hóa nội bộ cho chúng cho đến khi nó hoàn thành và sau đó trả về kết quả. Trong khi phương thức <strong>toString()</strong> không làm được điều đó (xem ví dụ trong file <strong>StringDecoder.js</strong></p>
<p>Vì vậy nếu như bạn nhận được ký tự <strong>utf8</strong> như <strong>chunk</strong> trong một <strong>stream</strong>, bạn luôn nên sử dụng StringDecoder</p>

<h2>Require() và Module trong Node</h2>
<p>Module là khái niệm lớp đầu tiên trong Node, và sự hiểu biết về cách thức hoạt động của module là điều bắt buộc</p>
<p>Có hai khái niệm quan trọng trong module, và điều đầu tiên là <strong>require</strong> và <strong>require</strong> cũng là một đối tượng global</p>
<p>Mỗi <strong>module</strong> sẽ lấy một <strong>require</strong> function của chính nó, và <strong>module</strong> cũng là một đối tượng global và được sử dụng để quản lý toàn bộ những module mà chúng ta đã gọi với function <strong>require</strong></p>
<p>Thực hiện <strong>require</strong> trong Node khá đơn giản. Khi <strong>require</strong> một module trong Node, Node sẽ thực thi qua những bước sau:</p>
<ul>
  <li><strong>Resolving:</strong> tìm đường dẫn tuyệt đối tới module</li>
  <li><strong>Loading:</strong> được xác định vào nội dung của tập tin dựa vào đường dẫn trong <strong>resolving</strong></li>
  <li><strong>Wrapping:</strong> là quá trình đóng gói mỗi module cùng với scope của riêng nó, và cũng tạo nên <strong>require</strong> nội bộ tới mỗi module (câu này khó hiểu v~)</li>
  <li><strong>Caching:</strong> là quá trình cache lại module, nghĩa là sau này bạn có require module đó một lần nữa thì nó sẽ không thực hiện lại từ bước đầu</li>
</ul>
<p>Để biết trong <strong>module</strong> có gì, bạn có thể log đối tượng module đó ra trong file bất kì, hoặc đơn giản là in ra     module trong <strong>REPL</strong></p>
<p>Trong các thành phần của module, trường <strong>id</strong> là trường dùng để định danh module, vì đối tượng module ở mỗi file là khác nhau. Thường thì trường <strong>id</strong> này sẽ là đường dẫn tuyệt đối đến file. Nếu như file đó là root, <strong>id</strong> sẽ là dấu '.'</p>
<p>Một trong những trường quan trọng trong module đó là <strong>paths</strong></p>
<p>Trường <strong>paths</strong> bao gồm tất cả các đường dẫn đến thư mục <strong>node_modules</strong></p>
<p>Khi require một module có trong <strong>file system</strong>, bước <strong>resolving sẽ trả về ngay lập tức</strong></p>
<p>Khi require module không có trong <strong>file system</strong>, Node sẽ tìm kiếm module đó trong tất cả các đường dẫn có trong <strong>paths</strong>. Nếu không tìm thấy, Node sẽ trả về một lỗi <strong>`Can not found module ...`</strong></p>
<p>Vì <strong>node_modules</strong> có quan hệ 1 - 1 với <strong>file system</strong>(fs) nên khi require một module có trong <strong>node_modules</strong> sẽ giống như require một module có trong <strong>file system</strong> của Node</p>

<p>Việc <strong>require</strong> trong Node thực chất là tải nội dung của một file vào trong bộ nhớ</p>
<p>Khi thực hiện require file A trong file B, nội dung của file A sẽ được load và thực thi khi file B được chạy. Hoặc có thể sử dụng <strong>require.resolve(<file name>)</strong>. Chức năng của <strong>require.resolve</strong> giống với chức năng của <strong>require</strong>, chỉ khác ở một điểm <strong>require.resolve</strong> không load nội dung của file. Sử dụng <strong>require.resolve</strong> vẫn sẽ trả về lỗi nếu file đó không tồn tại. Chính vì vậy <strong>require.resolve</strong> thường được sử dụng để kiểm tra file hoặc module có tồn tại hay không.</p>

<h2>JSON and C++ addons</h2>
<p>Khi require một file, <strong>Node</strong> sẽ tìm kiếm những file có định dạng <strong>.js</strong>. Nếu không thể tìm thấy bất kì file <strong>.js</strong> nào, Node sẽ tìm file có định dạng <strong>.json</strong>. Và nếu không tìm thấy file nào dạng <strong>.json</strong>, nó sẽ tìm sang những file có dạng <strong>.node</strong> và kết thúc</p>
<p>Khi load một file dạng <strong>JSON</strong>, Node sẽ parse file đó như là JSON text</p>
<p>Có một lời khuyên khi require các file không phải file Javascript, đó là bạn nên đặt <strong>extension</strong> của nó vào trong require. Ví dụ <strong>`const config = require('./config.json')`</strong>. Mặc dù không đặt extension của file, Node vẫn có thể tìm kiếm được file đó nhưng chúng ta sẽ khó khăn khi đọc code vì không biết đang import file JSON</p>
<p>Những file có định dạng <strong>.node</strong> là những file được build từ addon của Node. Chúng ta có thể viết addon cho Node dựa vào hướng dẫn trên trang chủ <a href="https://nodejs.org/dist/latest-v8.x/docs/api/addons.html"><strong>C++ Addons</strong></a></p>