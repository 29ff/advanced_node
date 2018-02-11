<h1>Node's Event-driven Architecture</h1>

<h2>Callbacks, Promises, and Async/Await</h2>

<p>Cách quen thuộc nhất mà Node xử lý các lời gọi async là dùng callback. Nó được sử dụng trong một thời gian dài trước khi Node hỗ trợ thêm <strong>promise</strong> và <strong>async/await</strong></p>

<p>Chúng ta đã biết được cách callback hoạt động với event loop, nhưng callback trong một định nghĩa chung chỉ là một function được truyền vào một function khác</p>

<p>Bạn cần phải hiểu rằng callback không biểu thị một lời gọi async trong code. Ở trong phần trước chúng ta đã thấy cách mà một function vừa là sync và async và cách chúng ta giải quyết vấn đề đó với <strong>process.nextTick</strong>. Hãy xem một function async thông thường và được viết theo callback style (trong file async-callback.js)</p>


<p>Trong những phiên bản Javascript mới, chúng ta có <strong>promise</strong>. <strong>Promise</strong> có thể là một sự lựa chọn khác của callback cho những async API. Thay vì truyền một callback như là một tham số và sử lý error trong cùng một hàm. Một <strong>promise</strong> object cho phép chúng ta sử lý các trường hợp thành công và lỗi một cách tách biệt và cũng cho phép chúng ta nối nhiều lời gọi async lại với nhau thay vì nesting chúng lại với nhau</p>

<p>Chúng ta hay cùng convert từ callback sang promise (xem file async-promise.js)</p>

<p>Cách sử dụng <strong>promise</strong> gần như là hoàn toàn giống với cách sử dụng callback. Nhưng code của bạn sẽ dễ đọc và dễ debug hơn</p>

<p>Phương thức chính của Node khi làm việc với async code là callbacks. Và khi bạn sử dụng callback thuần, code của bạn đang sử dụng callback interface. Nếu bạn muốn sử dụng promise, bạn có thể giữ cấu trúc callback và thêm một promise interface vào đó. Rất nhiều những package nổi tiếng của Node sử dụng cách này. Cách làm rất đơn giản, bạn không cần thay thế lời gọi callback, giữ chúng và thêm một lời gọi promise (xem file async-callback-promise.js)</p>

<p>Thêm một promise interface làm cho code của bạn dễ đọc hơn rất nhiều khi chúng ta có một vòng lặp bên ngoài một async function. Với callback, mọi thứ sẽ trở lên rất lộn xộn. Nhưng cách phổ biến nhất bây giờ khi làm việc với async code đó là sử dụng async (xem file async-async-await.js). Để sử dụng async-await bạn phải sử dụng phiên bản Node từ v7.6 trở lên</p>

<p>Khi sử dụng async, code async của bạn sẽ giống như trở thành sync code và trở lên rất dễ đọc.</p>

<h2>Event Emitter</h2>

<p>Event Emitter là một module trong Node. Nó tạo điều kiện cho các đối tượng trong Node giao tiếp với nhau</p>

<p>Event Emitter nằm ở trong core của kiến trúc hướng sự kiện bất đồng bộ trong Node</p>

<p>Rất nhiều những module có sẵn trong Node được kế thừa từ Event Emitter. Cách Event Emitter hoạt động rất đơn giản, nó emit tên của một sự kiện mà listener có thể gọi đến</p>

<p>Một event emitter có hai tính năng chính, phát ra tên của một sự kiện, và đăng kí listener function</p>

<p>Để sử dụng event emitter, chúng ta chỉ cần tạo một class được kế thừa từ Event Emitter. Sau đó, chúng ta sẽ tạo mới một EventEmitter từ class được kế thừa. Tại  bất cứ điểm nào trong vòng đời của chúng, chúng ta có thể sử dụng emit function để emit bất cứ sự kiện nào mà chúng ta muốn</p>

<p>Emitting một sự kiện là một dấu hiệu cho thấy một vài thứ đã xảy ra. Những thứ này thường là một sự thay đổi trạng thái trong đối tượng phát ra. Chúng ta có thể thêm chức năng listen sự kiện bằng cách sử dụng phương thức <strong>on</strong> và chức năng listen chỉ đơn giản là thực hiện mỗi khi  nhận được một sự kiện mà có tên là tên mà phương thức nhận vào. Chúng ta có thể xem hình dưới đây để hiểu hơn:</p>

<img src="https://github.com/29ff/advanced_node/blob/master/Node's%20Event-driven%20Architecture/images/eventemitter1.png">