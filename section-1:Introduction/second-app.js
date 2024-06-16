const fs = require('fs');

let times = [];

console.log('print to the hello-2.txt');
for (let idx = 0; idx < 500; idx++) {
  let start = Date.prototype.getMilliseconds();
  for (let i = 0; i < 100; i++) {
    fs.appendFileSync('./hello-2.txt', `${i} line\n`);
  }
  let finish = Date.prototype.getMilliseconds()
  let time_taken = (finish - start) / 1000;
  console.log(`default: ${time_taken}`);
  times.push(time_taken);
}
console.log(times);
