const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  console.log(url, method)

  if (url === '/' && method === 'GET') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(`
      <body>
        <form action="/message" method="POST">
          <input type="text" name="message">
          <button type="submit">Send</button>
        </form>
        <a href="/message">message</a>
      </body>
    `);
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'GET') {
    const message = fs.readFileSync('./message.txt', 'utf-8');
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(`
      <body>
        <p>${message}</p>
        <a href="/">home</a>
      </body>
    `);
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    // when the event 'data' comes in the function (chunk) => {..., will be executed
    req.on('data', (chunk) => {
      body.push(chunk);
      console.log(chunk);
    })
    // when the envent 'end' comes in the function () => {..., will be executed
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      let message = parsedBody.split('=')[0] + '\n';
      console.log(message);
      fs.writeFile('message.txt', message, {flag: 'a'}, (err) => {
        if (!err) {
          res.statusCode = 302;
          res.setHeader('Location', '/');
          res.end();
        } else {
          console.log(err.message);
        }
      });
    })
  }
  console.log(req.url, req.method, req.headers);
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Node Page</title></head>')
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
  res.write('</html>');
  res.end();
};

// module.exports = requestHandler;

module.exports = {
  requestHandler
};

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';

// exports.handler = requestHandler;
// exports.someText = 'Some hard coded text';