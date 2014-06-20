express = require('express');
app = module.exports = express();
var port = process.env.PORT || 3000;
app.use("/", express.static('./dist/'));
app.listen(port);
console.log('Server running in port:' + port );