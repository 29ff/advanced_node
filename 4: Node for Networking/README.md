# Node for Networking

## TCP Networking with the Net Module

Hãy cùng khởi tạo một server network cơ bản. Chúng ta sử dụng module **net** trong node với phương thức createServer để tạo một server. Sau đó lắng nghe sự kiện connection với tất cả các client kết nối vào server này. Khi một client bất kì nào kết nối vào server sẽ log "client connected"

```js
const server = require('net').createServer();

server.on('connection', socket => {
  console.log('Client connected');
});
```

Hàm callback được thực thi mỗi khi một client kết nối vào, hàm callback này cũng cho chúng ta truy cập vào socket của kết nối đó. Chúng ta có thể thực hiện đọc và ghi vào socket này. Chúng ta sẽ thử ghi vào stream này như sau:

```js
const server = require('net').createServer();

server.on('connection', socket => {
  console.log('Client connected');
  socket.write('Welcome new client');
});

server.listen(8000, () => console.log('Server bound'));
```

Chúng ta có thể test server này bằng cách sử dụng netcat với lệnh sau **nc localhost 8000** và chúng ta có thể nhìn thấy "Welcom new client"

Client hoàn toàn có thể ghi vào socket đó, nhưng ở server sẽ không nhận được thông tin mà client nhập vào. Socket là một stream 2 chiều, vì vậy chúng ta có thể coi nó như là một EventEmitter, vì vậy chúng ta có thể thực hiện để socket lắng nghe khi có data được ghi vào nó như sau:

```js
const server = require('net').createServer();

server.on('connection', socket => {
  console.log('Client connected');
  socket.write('Welcome new client');

  socket.on('data', data => {
    console.log(data);
  });
});

server.listen(8000, () => console.log('Server bound'));
```

Khi client nhập gì đó, server sẽ nhận được data như nó ở dưới dạng Buffer. Điều này rất thuận lợi cho chúng ta vì node không quan tâm đến encoding, client có thể nhập data vào đây bằng bất cứ ngôn ngữ gì mà họ muốn. Bây giờ chúng ta thử gửi lại data người dùng vừa nhập vào cho chính người dùng. Chúng ta sẽ có đoạn code như sau:

```js
const server = require('net').createServer();

server.on('connection', socket => {
  console.log('Client connected');
  socket.write('Welcome new client');

  socket.on('data', data => {
    console.log(data);
    socket.write('data is: ')
    socket.write(data)
  });
});

server.listen(8000, () => console.log('Server bound'));
```

Tuy nhiên lần này dữ liệu chúng ta nhận được từ server lại là đúng những gì mà client nhập vào chứ không phải là một Buffer. Vì phương thức write mặc định encode của data là utf8. Chính vì vậy nên client nhìn thấy text dưới dạng utf8. Chúng ta cũng có thể cài đặt encode mặc định cho toàn bộ socket bằng dòng lệnh ***socket.setEncoding('utf8')***

```js
const server = require('net').createServer();

server.on('connection', socket => {
  console.log('Client connected');
  socket.write('Welcome new client');

  socket.on('data', data => {
    console.log(data);
    socket.write('data is: ')
    socket.write(data)
  });

  socket.setEncoding('utf8')
});

server.listen(8000, () => console.log('Server bound'));
```

Lúc này data chúng ta nhận được từ server cũng sẽ được encode sang utf8 chứ không còn là dạng Buffer. Chúng ta cũng có thể biết được khi nào một client ngắt kết nối bằng cách lắng nghe sự kiện **end**:

```js
const server = require('net').createServer();

server.on('connection', socket => {
  console.log('Client connected');
  socket.write('Welcome new client');

  socket.on('data', data => {
    console.log(data);
    socket.write('data is: ')
    socket.write(data)
  });

  socket.on('end', () => {
    console.log('Client disconnected')
  })

  socket.setEncoding('utf8')
});

server.listen(8000, () => console.log('Server bound'));
```

## Working with multiple socket

Chúng ta cùng cải thiện một chút với ứng dụng trên để biến nó trở thành một ứng dụng chat. Với ứng dụng trên, chúng ta có thể có nhiều client kết nối đến nhưng chúng ta không thể định danh được client. Vì vậy chúng ta sẽ tạo một biến counter để làm việc trên. Biến counter bắt đầu bằng 0 và sẽ tự tăng lên mỗi khi một client kết nối vào. Chúng ta cũng cần một object để lưu toàn bộ socket của các client kết nối vào để chúng ta có thể gửi thông tin mà mỗi client nhập vào cho những client còn lại. Chúng ta có đoạn code như sau:

```js
const server = require('net').createServer();

let counter = 0;
let sockets = {}

server.on('connection', socket => {
  console.log('Client connected');
  socket.write('Welcome new client');

  // mỗi khi có một client kết nối sẽ thêm id cho socket thêm socket của client này vào object sockets
  socket.id = counter++
  sockets[socket.id] = socket

  socket.on('data', data => {
    // mỗi khi nhận được data, chúng ta sẽ thực hiện gửi lại data này cho tất cả các client có trong object sockets
    Object.entries(sockets).forEach(([key, clientSocket]) => {
      clientSocket.write(`${socket.id}: `)
      clientSocket.write(data)
    })
  });

  socket.on('end', () => {
    console.log('Client disconnected')
  })

  socket.setEncoding('utf8')
});

server.listen(8000, () => console.log('Server bound'));
```

Lúc này client có thể chat với nhau và được dịnh danh rõ ràng. Tuy nhiên có một vấn đề, nếu như một client ngắt kết nối và những client còn lại gửi data cho server, lúc này server sẽ bị crash, vì nó đang gửi data cho một socket đã bị ngắt. Do đó, khi client ngắt kết nối, chúng ta cần phải xóa client này ra khỏi object sockets để tránh gửi data cho socket đó. Tại hàm xử lý của sự kiện **end**, chúng ta thêm đoạn code **delete sockets[socket.id]** để xóa socket vừa ngắt kết nối. Đoạn code sẽ như sau:

```js
const server = require('net').createServer();

let counter = 0;
let sockets = {}

server.on('connection', socket => {
  console.log('Client connected');
  socket.write('Welcome new client');

  // mỗi khi có một client kết nối sẽ thêm id cho socket thêm socket của client này vào object sockets
  socket.id = counter++
  sockets[socket.id] = socket

  socket.on('data', data => {
    // mỗi khi nhận được data, chúng ta sẽ thực hiện gửi lại data này cho tất cả các client có trong object sockets
    Object.entries(sockets).forEach(([key, clientSocket]) => {
      clientSocket.write(`${socket.id}: `)
      clientSocket.write(data)
    })
  });

  socket.on('end', () => {
    delete sockets[socket.id]
    console.log('Client disconnected')
  })

  socket.setEncoding('utf8')
});

server.listen(8000, () => console.log('Server bound'));
```

## Improve the chat app

Chúng ta có thể cải thiện ứng dụng chat một chút nữa như sau:

```js
const server = require('net').createServer();

let counter = 0;
let sockets = {}

server.on('connection', socket => {
  console.log('Client connected');
  // hỏi tên khi có người kết nối
  socket.write('Type your name: ')
  socket.id = counter++
  

  socket.on('data', data => {
    // kiểm tra người dùng có id này đã tồn tại trong object sockets chưa, nếu chưa có nghĩa là người dùng này chưa nhập tên
    if (!sockets[socket.id]) {
      // thực hiện lấy và format tên của người dùng
      socket.name = data.toString().trim()
      // cho người dùng vào trong object sockets
      sockets[socket.id] = socket
      // hiển thị lời chào
      socket.write(`Hello ${socket.name}!\n`)
      return
    }

    Object.entries(sockets).forEach(([key, clientSocket]) => {
      // không nên gửi lại cho chính người đó
      if (socket.id == key) return
      clientSocket.write(`${socket.name}: `)
      clientSocket.write(data)
    })
  });

  socket.on('end', () => {
    delete sockets[socket.id]
    console.log('Client disconnected')
  })

  socket.setEncoding('utf8')
});

server.listen(8000, () => console.log('Server bound'));
```

## DNS Module

Chúng ta sẽ cùng nói qua về DNS Module. Chúng ta có thể dùng module dns để thực hiện dịch từ network name thành network address và ngược lại. Chúng ta có đoạn code như sau:

```js
const dns = require('dns')

dns.lookup('pluralsight.com', (err, address) => {
  console.log(address)
})
```

Phương thức lookup trong dns là một phương thức đặc biệt, vì nó chẳng cần phải tạo request lên mạng để biết được address, thay vào đó nó sử dụng các cơ sở hệ điều hành để thực hiện phân giải. Điều này có nghĩa là nó sẽ sử dụng các luồng libuv. Tất cả các phương thức khác trong module dns đều sử dụng request lên mạng mà không sử dụng các luồng libuv.

Ví dụ một phương thức khác là **resolve4**. **"4"** ở đây nghĩa là chúng ta chỉ quan tâm đến các dịa chỉ ipv4. Chúng ta có đoạn code sau:

```js
dns.resolve4('bluutech.co', (err, address) => {
  console.log(address)
})
```

Nó sẽ trả về cho chúng ta một mảng các ip. Các ip này chính là record A trong domain. Nếu chúng ta muốn lấy các record khác mà không phải record A, ví dụ chúng ta muốn lấy record MX chúng ta chỉ cần chỉ định như sau:

```js
dns.resolve('bluutech.co', 'MX', (err, address) => {
  console.log(address)
})
```

Hoặc có thể dùng phương thức **resolveMx** cũng cho ra kết quả tương tự, ngoài ra còn có phương thức **resolveCname**, ...

## UDP Datagram Sockets

Hãy cùng xem một ví dụ về UDP socket trong Node. Để làm điều này, chúng ta cần require module **dgram**. Nó cung cấp các phương thức để làm việc với UDP datagram socket. Chúng ta tạo một socket như sau

```js
const dgram = require('dgram')
const server = dgram.createSocket('udp4')
```

Tham số cho phương thức createSocket có thể là udp4 hoặc udp6 phụ thuộc vào loại socket mà bạn muốn sử dụng. Và để lắng nghe chúng ta sẽ định nghĩa port và host và sử dụng phương thức bind như sau:

```js
...
const PORT = 3333
const HOST = '127.0.0.1'
server.bind(PORT, HOST)
```

Server này là một EventEmitter, và chúng ta cần nó lắng nghe một vài sự kiện. Sự kiện đầu tiên là "listening" được gọi khi UDP server bắt đầu lắng nghe.

```js
server.on('listening', () => console.log('UDP server listening'))
```

và một sự kiện nữa chúng ta sẽ lắng nghe đó là sự kiện "message". Sự kiện này xảy ra mỗi khi socket nhận được một message. Nó sẽ trả về 2 tham số là message, và remoteInfomation

```js
server.on('message', (msg, rInfo) => {
  console.log(`${rInfo.address}:${rInfo.port} - ${msg}`)
})
```

Và đó là phần cho server, bây giờ chúng ta cùng tạo client. Chúng ta cũng tạo một socket udp và sử dụng method "send" để gửi message

```js
const client = dgram.createSocket('udp4')

client.send('something here', PORT, HOST, err => {
  if (err) throw err
  client.close()
})
```

Phương thức "send" nhận vào cả port và host của socket mà nó cần gửi message đến. Phương thức này trả về err nếu có và trong hàm callback chúng ta cần đóng client này lại khi không còn sử dụng đến chúng. Message mà một client gửi đi có thể là string cũng có thể là một mảng hoặc buffer. Hơn nữa nó còn chia cắt được message. Xem thêm ở doc của NodeJS

## Summary

Trong toàn bộ bài này, chúng ta đã tìm hiểu về TCP và UDP networking, chúng ta đã tạo một server network cơ bản bằng module "net" và tạo một server chat cơ bản. Chúng ta cũng tìm hiểu về module "dns" và cách phân giải ip thành địa chỉ và ngược lại. Chúng ta cũng tìm hiểu về module "dgram" và cách tạo các socket UDP
