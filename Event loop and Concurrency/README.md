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
<p><em>Xem hình <strong>EventLoop.png</strong> trong folder Event Loop</em></p>
<img src='/EventLoop.png'>
<p>Để hiểu vòng lặp event loop thì phải hiểu được những thứ hoạt động cùng với nó tạo nên cách Node xử lý các tiến trình bất đồng bộ(hình trên)</p>
