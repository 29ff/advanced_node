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

![Image](/images/EventLoop.png)

<p>Để hiểu vòng lặp <strong>Event loop</strong> thì phải hiểu được những thứ hoạt động cùng với nó tạo nên cách Node xử lý các tiến trình bất đồng bộ(hình trên)</p>
<p>V8 có <strong>Stack</strong>(ngăn chứa) và <strong>Heap</strong></p>
<p><strong>Heap</strong> thì đơn giản, nó là nơi objects được lưu trữ trong bộ nhớ. Về cơ bản bộ nhớ đó được phân bổ bởi máy ảo cho nhiều tasks khác nhau. Ví dụ khi chúng ta thực thi một function, một khu vực trong <strong>Heap</strong> được phân bổ để thực thi như là local scope của function đó</p>
<p>Cả <strong>Stack</strong> và <strong>Heap</strong> đều là một phần của run-time engine, không phải chỉ là của Node. Node thêm vào những API như là <strong>timers</strong>, <strong>emitters</strong> và <strong>wrappers</strong> bên ngoài những tính toán của hệ điều hành</p>
<p>Nó cũng cung cấp <strong>event queue</strong> và <strong>Event Loop</strong> sử dụng thư việc <strong>libuv</strong></p>
<p><strong>Event Loop</strong> là một vòng lặp đơn giản và nó làm việc giữa <strong>event queue</strong> và <strong>Call stack</strong>. Nhưng chúng ta muốn hiểu được <strong>Event loop</strong> thì cũng cần phải hiểu được <strong>Call stack</strong> hay <strong>event queue</strong> là gì!</p>

<h2>Call stack</h2>
<p><strong>Call stack</strong> là một danh sách các functions. Một stack là một <strong>first in last out</strong> trong cấu trúc dữ liệu (cái này không biết có thể google)</p>
<p> Phần tử trên cùng chúng ta có thể đẩy chúng ra khỏi stack là phần tử cuối cùng được đẩy vào trong stack</p>

![Image](/images/CallStack.png)

<p>Xem hình trên có thể thấy function f1 sẽ được thực thi đầu tiên, vì vậy nó sẽ được đẩy vào callstack đầu tiên, tiếp theo là f2, f3, ... . Vì JavaScript là single threaded nên nó chỉ có một <strong>Call stack</strong> và nó chỉ có thể làm được một việc trong cùng một khoảng thời gian. Khi chúng ta gọi nhiều functions, chúng sẽ được sắp xếp lần lượt vào <strong>Call stack</strong> và cũng được thực thi lần lượt. Điều đó cũng đúng khi chúng ta sử dụng đệ quy</p>

![Image](/images/CallStack2.png)

<p><strong>Call stack</strong> sẽ bắt đầu với lời gọi <strong>IIFE</strong>. Nó là một anonymous function và nó sẽ định nghĩa các functions khác và trong trường hợp này nó sẽ thực thi function <strong>printDouble</strong>. Tiếp theo function <strong>printDouble</strong> được đẩy vào stack, sau đó là function <strong>double</strong>, sau đó là function <strong>add</strong>. Function <strong>add</strong> được thực thi và trả về kết quả, sau đó thì được đẩy ra khỏi stack. lần lượt như vậy đến khi kết qủa cuối cùng được đẩy về function <strong>printDouble</strong> và thực hiện console.log. Sau khi log xong thì function <strong>printDouble</strong> được đẩy ra khỏi stack và cuối cùng là đẩy function <strong>IIFE</strong> ra khỏi stack và kết thúc</p>
<p><strong>Call stack</strong> không chỉ xuất hiện trong Node, có thể bạn cũng đã từng thấy nó trên trình duyệt. Hoặc bất cứ khi nào bạn nhận được một lỗi xuất hiện trên console, console sẽ hiển thị <strong>call stack</strong>. Ví dụ như khi thay đổi biến <strong>a</strong> ở ví dụ trên thành biến <strong>x</strong> chưa được định nghĩa. Console Browser sẽ báo lỗi như hình dưới, và đó cũng là <strong>Call stack</strong>:</p>

![Image](/images/CallStack3.png)

<p>Còn nếu bạn gọi đệ quy một function như lại không có điều kiện để function đó thoát khỏi đệ quy, đó là lúc <strong>Call stack</strong> sẽ bị đầy và sẽ báo lỗi(hình dưới)</p>

![Image](/images/CallStack4.png)

<h2>Handling Slow Operations</h2>
<p>Những gì chúng ta thực hiện ở phía trên điều là những function được xử lý rất nhanh. Sẽ không có vấn đề gì nếu chúng được đẩy vào callstack và được thực hiện lần lượt. Nhưng khi chúng ta bắt đầu thực hiện những function mất nhiều thời gian hơn, lúc này chúng ta sẽ thấy hạn chế của <strong>single threaded</strong> bởi vì khi chúng ta thực hiện những tác vụ mất nhiều thời gian, những tác vụ khác sẽ bị block. Dưới đây là một ví dụ về vấn đề đó:</p>

![Image](/images/SlowOperations.png)

<p>Đó là lý do <strong>Event loop</strong> được sinh ra để giải quyết vấn đề này</p>

<h2>How Callbacks Work</h2>
<p>Node API được thiết kế xung quanh <strong>Call back</strong>. Chúng ta dùng một function như là một tham số của một function khác. Và những function được đẩy vào làm tham số đó sẽ được thực thi phía sau những function khác bằng một cách nào đó. Ví dụ nếu chúng ta thay đổi function <strong>slowAdd</strong> đưa ra kết quả trong <strong>setTimeout</strong> sau 5 giây. Function đầu tiên được truyền vào <strong>setTimeout</strong> là một callback function và nó sẽ được thực thi sau 5 giây. Vậy thì <strong>Call stack</strong> sẽ xử lý những function callback thế nào ?</p>

![Image](/images/Callback.png)

<p>Như hình trên function IIFE sẽ được đẩy vào callstack đầu tiên. Sau đó là function <strong>slowAdd</strong>, và tiếp theo là <strong>setTimeout</strong>, function <strong>setTimeout</strong> không gọi đến bất cứ function nào nhưng nó có một function như là một tham số, sau khi setTimeout được đẩy vào nó sẽ ngay lập tức bị đẩy ra. Và tại thời điểm đó, <strong>slowAdd</strong> cũng kết thúc và được đẩy ra khỏi callstack. Sau đó function <strong>slowAdd</strong> thứ 2 được đẩy vào</p>

![Image](/images/Callback2.png)

<p>Và lại giống như <strong>slowAdd</strong> đầu tiên, nó lại đẩy <strong>setTimeout</strong> vào và ngay lập tức bị đẩy ra, và kết thúc function <strong>slowAdd</strong> và cuối cùng đẩy function <strong>IIFE</strong> ra khỏi callstack</p>
<p>Thế nhưng bằng cách nào đó, sau 5 giây <strong>console.log(6)</strong> được đẩy vào callstack</p>

![Image](/images/Callback3.png)

<p>Và ngay sau đó <strong>console.log(8)</strong> được đẩy vào callstack</p>

![Image](/images/Callback4.png)

<p>Và để hiểu cách mà 2 dòng <strong>console.log</strong> cuối lại được đẩy vào callstack, chúng ta sẽ cùng nhìn rộng hơn bằng hình ảnh dưới</p>

![Image](/images/Callback5.png)

<p>Điều đầu tiên chúng ta cần phải hiểu đó là một lời gọi API giống như <strong>setTimeout</strong> không phải là một phần của V8. Nó được cung cấp bởi bản thân Node, cũng giống như việc nó được cung cấp bởi trình duyệt. Đó là lý do vì sao cách hoạt động của nó khá lạ strong callstack thông thường</p>

<p>Hãy bắt đầu với <strong>event queue</strong>, như tên gọi của nó, nó là một ngăn chưa events. Khi chúng ta chứa một event trong queue, chúng ta sẽ chứa một function khác được gọi là callback. Một queue có cấu trúc dữ liệu kiểu <strong>first in first out</strong>. Vì vậy sự kiện đầu tiên nằm trong ngăn chứa sẽ cũng là sự kiện đầu tiên bị đẩy ra khỏi ngăn chứa. Để đẩy một event ra khỏi ngăn chứa và thực thi nó, chúng ta chỉ cần thực thi function liên kết với nó. Việc thực thi một function sẽ đẩy function đó vào callstack. Vì vậy với ví dụ trên chúng ta sẽ có một <strong>IIFE</strong> function và function slowAdd như hình dưới</p>

![Image](/images/Callback6.png)

<p>Sau đó setTimeout được đẩy vào với tham số đầu tiên là callback, tham số thứ 2 là 5 giây</p>

![Image](/images/Callback7.png)

<p>Function callback trong setTimeout trên thực chất là một anonymous function. Trong trường hợp này, Node sẽ nhìn thấy một cuộc gọi đến setTimeout API và ngay lập tức tạo một timer bên ngoài Javascript runtime</p>

![Image](/images/Callback8.png)

<p>Sau đó như đã nói ở trên, ngay sau đó setTimeout sẽ bị đẩy ra khỏi callstack, function slowAdd cũng được thực thi và bị đẩy ra khỏi callstack. Tiếp theo function addSlow thứ 2 được đẩy vào và tiếp theo là setTimeout của function thứ 2</p>

![Image](/images/Callback9.png)

<p>Sau đó, setTimeout cũng đẩy ra một callback function thứ 2. Ngay lập tức setTimeout sẽ bị đẩy ra khỏi callstack, sau đó là function addSlow và cuối cùng là function <strong>IIFE</strong></p>

![Image](/images/Callback10.png)

<p>Cuối cùng sau 5 giây, callback 1 và callback 2 sẽ được đẩy vào <strong>event queue</strong></p>

![Image](/images/Callback11.png)

<p>Sau đó nhiệm vụ của <strong>event loop</strong> là lắng nghe sự kiện trong <strong>event queue</strong>. <strong>Event loop</strong> sẽ kiểm tra khi và chỉ khi <strong>callstack</strong> trống và <strong>event queue</strong> có event đang chờ thì <strong>event loop</strong> sẽ phải đẩy lần lượt những event này vào <strong>callstack</strong>. Và nhiệm vụ của <strong>callstack</strong> là thực thi chúng. <strong>Event loop</strong> sẽ đẩy lần lượt các event đến khi nào <strong>event queue</strong> không còn event nào cả</p>

<p>Trong trường hợp trên, <strong>event loop</strong> sẽ đẩy callback 1 lên <strong>callstack</strong>, callback 1 sẽ gọi đến <strong>console.log(6)</strong></p>

![Image](/images/Callback12.png)

<p>Hàm log sẽ được <strong>callstack</strong> thực thi ngay lập tức và đẩy ra khỏi <strong>callstack</strong>. Function callback 1 cũng thực thi xong và đẩy ra khỏi <strong>callstack</strong>. Lúc này <strong>event loop</strong> lại nhận thấy <strong>callstack</strong> đang trống và <strong>event queue</strong> thì có callback 2 đang chờ. <strong>Event loop</strong> sẽ lại đẩy callback 2 vào <strong>callstack</strong> và thực thi</p>

![Image](/images/Callback13.png)

<p><strong>console.log(8)</strong> được thực thi và bị đẩy ra, sau đó là function callback 2 và cuối cùng là kết thúc chương trình</p>

<p>Tất cả các Node APIs đều được thực thi với mô hình trên. Một vài tiến trình sẽ xử lý I/O bất đồng bộ, theo dõi callback và khi nó done thì đẩy nó vào <strong>event queue</strong>. Nếu chúng ta không cẩn thận về tổng số event chúng ta đẩy vào <strong>event queue</strong>, chúng ta có thể làm cho <strong>event queue</strong> bị quá tải. Việc đó sẽ khiến cả <strong>callstack</strong> và <strong>event queue</strong> luôn luôn làm việc</p>

<p>Là một Node developer, phía trên là những điều vô cùng quan trọng chúng ta cần phải hiểu và nhớ về blocking và non-blocking code</p>

<h2>setImmediate and process.nextTick</h2>

<p>Điều gì sẽ xảy ra nếu như thời gian chờ là 0 giây ? Mọi thứ diễn ra tương tự như phía trên. Hàm setTimeout vẫn sẽ đẩy ra một callback vào Node và sau đó ngay lập tức được chuyển đến event queue vì thời gian chờ là 0 giây. Và sau đó vẫn phải đợi callstack trống thì các callback mới được đẩy lên callstack. Đó là lý do vì sao mặc dù thời gian chờ là 0 giây nhưng các tiến trình async vẫn chạy sau nhưng tiến trình sync</p>

<p>Event loop trong Node bao gồm nhiều giai đoạn. Những <strong>timers</strong> chạy trong một trong những giai đoạn bên dưới trong khi da phần các tính toán I/O chạy qua những giai đoạn khác</p>

![Image](/images/setImmediate.png)

<p>Node có một <strong>timers</strong> đặc biệt - setImmediate. setImmediate sẽ chạy trong một giai đoạn tách biệt trong event loop. Nó gần giống như việc chạy setTimeout với 0s, ngoại trừ một số trường hợp, setImmediate sẽ ưu tiên chạy trước so với setTimeout 0s (chạy file setImmediate.js). Chúng ta nên sử dụng setImmediate khi chúng ta muốn thực thi một thứ gì đó trong <strong>next tick</strong> trong event loop</p>

<p>Node có một trong process là <strong>process.nextTick</strong> api. Nó rất giống với setImmediate nhưng Node thực ra sẽ không thực thi callback của nó trong <strong>next tick</strong> trong event loop. Vì vậy tên của nó có thể sẽ gây hiểu nhầm.</p>

<p><strong>process.nextTick</strong> thực ra không phải là một phần của event loop và nó cũng không quan tâm đến những giai đoạn của event loop </p>

<p>Node xử lý những callback đăng ký với nextTick sau khi tiến trình hiện tại được hoàn thành và trước khi event loop tiếp tục. Điều này vừa hữu ích nhưng cũng vừa nguy hiểm. Vì vậy hãy cẩn thận khi dùng nó. Đặc biệt là khi dùng đệ quy process.nextTick</p>

<p>Một trong những ví dụ về việc sử dụng process.nextTick một cách hợp lý là việc sử dụng process.nextTick để tạo ra một function tiêu chuẩn (chạy file nextTick.js)</p>

