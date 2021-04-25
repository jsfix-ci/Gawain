/* eslint-disable no-console */
const jsonServer = require("json-server");
const path = require("path");

let app = jsonServer.create();
let router = jsonServer.router(path.join(__dirname, "./db.json"));
let middlewares = jsonServer.defaults();

app.use(function (req, res, next) {
  setTimeout(next, 2000);
});
app.use(middlewares);
app.use(router);

app.listen(3000, function () {
  console.log("JSON Server is running on localhost:3000");
});
