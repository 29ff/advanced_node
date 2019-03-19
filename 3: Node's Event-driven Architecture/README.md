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

![Image](/images/eventemitter1.png)

<p>Chúng ta cùng xem ví dụ dưới đây (cũng có trong file sync-events.js)</p>

```javascript
const EventEmitter = require('events');

class WithLog extends EventEmitter {
  execute(taskFunc) {
    console.log('Before executing');
    this.emit('begin');
    taskFunc();
    this.emit('end');
    console.log('After executing');
  }
}

const withLog = new WithLog;

withLog.on('begin', () => { console.log('About to execute') });
withLog.on('end', () => { console.log('Done with execute') });

withLog.execute(() => { console.log('*** Executing task ***') });
```

<p>Trong ví dụ trên, class WithLog là một EventEmitter, nó định nghĩa một function là <strong>execute</strong>, function này nhận vào một <strong>taskFunc</strong> và đóng gói tất cả những thực thi lại và log chúng ra. Nó trả về các sự kiện trước và sau khi thực thi, và chúng ta sẽ thử chạy file để xem nhận lại được kết quả như thế nào (thử chạy file sync-events.js)</p>

<p>Khi bạn chạy file trên bạn sẽ nhận thấy rằng tất cả đều chạy đồng bộ. Vì vậy giống như callback, không nên cho rằng event emitter là đồng bộ hay bất đồng bộ. Vậy khi chúng ta chuyển function <strong>taskFunc</strong> sang async bằng hàm setTimeout thì sao? Kết quả sẽ không giống như chúng ta mong đợi. Dòng <strong>*** Executing task ***</strong> được in ra sau cùng. Vậy nếu chúng ta muốn thực thi một vài dòng code sau khi hàm async kết thúc thì phải làm thế nào? Chúng ta có thể sử dụng callback truyền thống hoặc sử dụng promise</p>

<p>Một lợi ích của việc sử dụng event thay vì callback là chúng ta có thể thực thi nhiều hành động khác nhau với cùng một sự kiện bằng cách định nghĩa nhiều listener. Để làm điều tương tự với callback, chúng ta bắt buộc phải viết thêm logic code bên trong hàm callback. Event là một cách tuyệt vời để dùng cho những ứng dụng cho phép nhiều plugin bên trong xây dựng lên lõi của ứng dụng. Bạn có thể nghĩ về chúng như là một điểm móc cho phép tùy biến những hành động xung quanh một sự kiện nào đó</p>

<h2>Arguments, Errors and Order of Listeners</h2>

<p>Trong ví dụ trước, chúng ta có 2 sự kiện được đăng kí. Sự kiện <strong>error</strong> với object <strong>err</strong></p>

![Image](/images/argumenterrorandlistener1.png)

<p>và sự kiện <strong>data</strong> được đăng kí với object <strong>data</strong></p>

![Image](/images/argumenterrorandlistener2.png)

<p>Chúng ta có thể sử dụng bao nhiêu tham số tùy thích vào trong những sự kiện đã đặt tên. Tất cả những tham số đó đều nhận được trong function listener. Ví dụ, để làm việc với sự kiện <strong>data</strong>, chúng ta sẽ tạo một function listener, function này nhận vào tham số <strong>data</strong> mà chúng ta đã truyền vào từ sự kiện đã được đăng kí. Data này chính là nội dung đọc được từ file</p>

![Image](/images/argumenterrorandlistener3.png)

<p>Một trong những sự kiện đặc biệt nữa đó là sự kiện<strong>error</strong>. <strong>Error</strong> là một sự kiện đặc biệt, vì nếu chúng ta không lắng nghe nó với một listener, node process sẽ bị thoát khi gặp lỗi. Để làm rõ vấn đề này, chúng ta sẽ có 2 lần thực thi phương thức <strong>execute</strong> và lần thực thi đầu tiên sẽ báo lỗi với một đường dẫn sai như hình dưới</p>

![Image](/images/argumenterrorandlistener4.png)

<p>Với lần thực thi đầu tiên, node process sẽ bị thoát đột ngột. Để tránh điều này, chúng ta cần một listener cho sự kiện <strong>error</strong></p>

![Image](/images/argumenterrorandlistener5.png)

<p>Khi lắng nghe sự kiện <strong>error</strong>, chúng ta sẽ log lỗi ra console và tiếp tục thực thi phương thức <strong>execute</strong> lần thứ 2. Bạn có thể nhận thấy lần thực thi thứ 2 vẫn được diễn ra, do vậy, node process đã không bị crash khi gặp lỗi ở lần thực thi đầu</p>

<p>Có một cách khác để thực hiện lắng nghe sự kiện lỗi khiến cho node process bị crash, đó là lắng nghe sự kiện <strong>uncaughtException</strong> trong <strong>process</strong>. Và điều này cho kết quả tương tự như khi lắng nghe sự kiện <strong>error</strong></p>

![Image](/images/argumenterrorandlistener6.png)

<p>Hai cách thì gần như là giống nhau, nhưng có một lưu ý khi sử dụng lắng nghe <strong>uncaughtException</strong> đó là chúng ta vẫn nên để node process thoát ra với <strong>process.exit(1)</strong>. Vì vậy, khi sử dụng lắng nghe <strong>uncaughtException</strong>, chúng ta nên thực hiện một vài dọn dẹp ở server và sau đó để server thoát ra một cách an toàn</p>

![Image](/images/argumenterrorandlistener7.png)

<p>Tuy nhiên, hãy tưởng tượng rằng có nhiều sự kiện lỗi xảy ra, điều này có nghĩa là listener của sự kiện <strong>uncaughtException</strong> sẽ được thực thi nhiều lần, điều đó có thể là vấn đề với việc chúng ta dọn dẹp trước khi thoát node process. Event Emitter có phương thức <strong>once</strong> thay vì <strong>on</strong> để lắng nghe sự kiện chỉ một lần</p>

![Image](/images/argumenterrorandlistener8.png)

<p>Đó là một cách sử dụng thực tế khi lắng nghe <strong>uncaughtException</strong> vì chúng ta sẽ thực hiện dọn dẹp và thoát khỏi node process ngay từ lần lắng nghe đầu tiên</p>

<p>Nếu chúng ta đăng kí nhiều listener cho một sự kiện, thì các listener này sẽ được thực thi theo thứ tự</p>

![Image](/images/argumenterrorandlistener9.png)

<p>Nếu chúng ta tạo ra một listener mới, nhưng chúng ta muốn listener đó được thực thi đầu tiên, chúng ta có thể sử dụng phương thức<strong>prependListener</strong></p>

![Image](/images/argumenterrorandlistener10.png)

<p>Nếu muốn xóa một listener, chúng ta có thể sử dụng phương thích <strong>removeListener</strong></p>
