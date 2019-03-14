const express = require('express');
const morgan = require('morgan');
const path = require('path');
var proxy = require('http-proxy-middleware')
const app = express();
const port = 3001;

app.use('/scripts', express.static(path.resolve(__dirname, './node_modules')));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/musicplayer/*', proxy({ target: 'http://54.242.57.180', changeOrigin: true }))
app.use('/api/description/*', proxy({ target: 'http://ec2-54-175-49-234.compute-1.amazonaws.com', changeOrigin: true }))
app.use('/api/comments/*', proxy({ target: 'http://ec2-54-80-244-244.compute-1.amazonaws.com', changeOrigin: true }))
app.use('/graphql', proxy({ target: 'http://ec2-3-91-101-162.compute-1.amazonaws.com', changeOrigin: true }))
app.use('/api/sidebar/*', proxy({ target: 'http://ec2-3-91-101-162.compute-1.amazonaws.com', changeOrigin: true }))
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
})
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});