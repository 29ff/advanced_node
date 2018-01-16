<h1>Event loop and Concurrency</h1>

<h2>What is I/O</h2>
<p><strong>I/O</strong> là dạng viết tắt của <strong>Input/Output</strong></p>
<p><strong>I/O</strong> là thể hiện cho việc giao tiếp giữa một tiến trình máy tính và CPU hay mọi thứ bên ngoài CPU đó bao gồm bộ nhớ, ổ cứng, mạng hay thậm chí là một tiến trình khác</p>
<p>Chúng giao tiếp với nhau qua tín hiệu hoặc lời nhắn. Tất cả những tín hiệu đó là <strong>Input</strong> khi chúng nhận được bởi tiến trình và trả về <strong>Output</strong> lại cho tiến trình đó</p>
<p>Định nghĩa <strong>I/O</strong> nhiều lúc bị hiểu sai bởi vì không chỉ trong máy tính, mọi thứ bên ngoài hay bên trong máy tính đều hoạt động như một <strong>I/O</strong>, nhưng khi nói về kiến trúc của <strong>Node</strong>, định nghĩa <strong>I/O</strong> thường được sử dụng cho truy cập vào ổ đĩa và mạng</p>
<p>Điều làm mất nhiều thời gian nhất để hiểu trong kiến trúc của Node đó là khái niệm <strong>Event loop</strong>.
 Sự lãng phí nhất trong lập trình đó là việc phải đợi các tiến trình <strong>I/O</strong> hoàn thành. Chúng ta có thể thực thi mọi thứ một cách đồng bộ, và đó là cách dễ dàng nhất để giải quyết. Nhưng đó là một cách tệ hại bởi vì một request có thể block tất cả những request khác. Một cách nữa là chúng ta có thể fork một process mới từ hệ điều hành để giải quyết những request khác. Điều này cũng khó khăn vì nó không có khả năng mở rộng khi có quá nhiều request. Cách phổ biến nhất để giải quyết những request đó là <strong>threads</strong>(luồng). Chúng ta có thể tạo ra những <strong>thread</strong> mới để giải quyết những request khác. Nhưng lập trình đa luồng có thể trở lên rất phức tạp khi nhiều luồng bắt đầu thực hiện chia sẻ thông tin resources với nhau. Rất nhiều những thư viện hay framework nổi tiếng sử dụng đa luồng. Ví dụ như Apache là đa luồng và nó thường tạo ra một luồng cho mỗi request. Mặt khác, Nginx là đơn luồng giống như <strong>Node</strong>, chúng loại bỏ những thứ được tạo ra bởi đa luồng và đơn giản hóa lập trình cho việc chia sẻ thông tin resources</p>
 <p>Những framework đơn luồng như <strong>Node</strong> sử dụng <strong>Event loop</strong> để giải quyết những tính toán <strong>I/O</strong> chậm mà không làm block main process. Đây là điều quan trọng nhất trong concept để hiểu về Node. Vậy <strong>Event loop</strong> hoạt động thế nào ?</p>

<h2>Event loop in Node</h2>
<p>Sự định nghĩa về <strong>Event loop</strong> khá dễ hiểu: <strong>Event loop là một thực thể để xử lý những sự kiện bên ngoài và chuyển chúng vào trong lời gọi callback</strong></p>
<p>Hoặc một định nghĩa khác cũng dễ hiểu không kém: <strong>Event loop là một vòng lặp chọn ra những sự kiện từ event queue và đẩy chúng vào callback trong callstack</strong></p>
<p>Oke, để bắt tay vào tìm hiểu <strong>Event Loop</strong> thì trước hết bạn cần hiểu đó là có một thứ gọi là <strong>Event Loop</strong> và Node sẽ tự động start nó khi thực thi script, vì vậy chúng ta không cần start bằng tay =))</p>
<p>Vòng lặp(event loop) này sẽ làm cho lời gọi callback trong lập trình bất đồng bộ trở lên khả thi</p>
<p>Node sẽ thoát khỏi vòng lặp này khi không còn lời gọi callback nào cần thực thi</p>
<img src='https://github.com/29ff/advanced_node/blob/master/Images/EventLoop.png'>
<p>Để hiểu vòng lặp <strong>Event loop</strong> thì phải hiểu được những thứ hoạt động cùng với nó tạo nên cách Node xử lý các tiến trình bất đồng bộ(hình trên)</p>
<p>V8 có <strong>Stack</strong>(ngăn chứa) và <strong>Heap</strong></p>
<p><strong>Heap</strong> thì đơn giản, nó là nơi objects được lưu trữ trong bộ nhớ. Về cơ bản bộ nhớ đó được phân bổ bởi máy ảo cho nhiều tasks khác nhau. Ví dụ khi chúng ta thực thi một function, một khu vực trong <strong>Heap</strong> được phân bổ để thực thi như là local scope của function đó</p>
<p>Cả <strong>Stack</strong> và <strong>Heap</strong> đều là một phần của run-time engine, không phải chỉ là của Node. Node thêm vào những API như là <strong>`timers`</strong>, <strong>`emitters`</strong> và <strong>`wrappers`</strong> bên ngoài những tính toán của hệ điều hành</p>
<p>Nó cũng cung cấp <strong>Event Queue</strong> và <strong>Event Loop</strong> sử dụng thư việc <strong>libuv</strong></p>
<p><strong>Event Loop</strong> là một vòng lặp đơn giản và nó làm việc giữa <strong>Event Queue</strong> và <strong>Call stack</strong>. Nhưng chúng ta muốn hiểu được <strong>Event loop</strong> thì cũng cần phải hiểu được <strong>Call stack</strong> hay <strong>Event queue</strong> là gì!</p>

<h3>Call stack</h3>
<p><strong>Call stack</strong> là một danh sách các functions. Một stack là một <strong>`first in last out`</strong> trong cấu trúc dữ liệu (cái này không biết có thể google)</p>
<p> Phần tử trên cùng chúng ta có thể đẩy chúng ra khỏi stack là phần tử cuối cùng được đẩy vào trong stack</p>
<img src='https://github.com/29ff/advanced_node/blob/master/Images/CallStack.png'>
<p>Xem hình trên có thể thấy function f1 sẽ được thực thi đầu tiên, vì vậy nó sẽ được đẩy vào callstack đầu tiên, tiếp theo là f2, f3, ... . Vì JavaScript là single threaded nên nó chỉ có một <strong>Call stack</strong> và nó chỉ có thể làm được một việc trong cùng một khoảng thời gian. Khi chúng ta gọi nhiều functions, chúng sẽ được sắp xếp lần lượt vào <strong>Call stack</strong> và cũng được thực thi lần lượt. Điều đó cũng đúng khi chúng ta sử dụng đệ quy</p>
<img src='https://github.com/29ff/advanced_node/blob/master/Images/CallStack2.png'>
<p><strong>Call stack</strong> sẽ bắt đầu với lời gọi <strong>IIFE</strong>. Nó là một anonymous function và nó sẽ định nghĩa các functions khác và trong trường hợp này nó sẽ thực thi function <strong>printDouble</strong>. Tiếp theo function <strong>printDouble</strong> được đẩy vào stack, sau đó là function <strong>double</strong>, sau đó là function <strong>add</strong>. Function <strong>add</strong> được thực thi và trả về kết quả, sau đó thì được đẩy ra khỏi stack. lần lượt như vậy đến khi kết qủa cuối cùng được đẩy về function <strong>printDouble</strong> và thực hiện console.log. Sau khi log xong thì function <strong>printDouble</strong> được đẩy ra khỏi stack và cuối cùng là đẩy function <strong>IIFE</strong> ra khỏi stack và kết thúc</p>
<p><strong>Call stack</strong> không chỉ xuất hiện trong Node, có thể bạn cũng đã từng thấy nó trên trình duyệt. Hoặc bất cứ khi nào bạn nhận được một lỗi xuất hiện trên console, console sẽ hiển thị <strong>call stack</strong>. Ví dụ như khi thay đổi biến <strong>a</strong> ở ví dụ trên thành biến <strong>x</strong> chưa được định nghĩa. Console Browser sẽ báo lỗi như hình dưới, và đó cũng là <strong>Call stack</strong>:</p>
<img src='https://github.com/29ff/advanced_node/blob/master/Images/CallStack3.png'>
