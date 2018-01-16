require('./index'); // require cũng không thể đọc được những biến có trong file index trừ khi nó được set là global

console.log(num); // chúng ta có thể đọc được biến num ở đây vì đã được set là global trong file index