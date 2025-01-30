const express = require('express');
// express app instance
const app = express();
app.use(express.json());

const server = app.listen(3000, () => console.log('Example app listening on port 3000!'));

// process.on('SIGTERM', () => {
//   console.info('SIGTERM signal received.');
//   console.log('Closing http server.');
//   server.close(() => {
//     console.log('Http server closed.');
//     // boolean means [force], see in mongoose doc
//     mongoose.connection.close(false, () => {
//       console.log('MongoDb connection closed.');
//       process.exit(0);
//     });
//   });
// });