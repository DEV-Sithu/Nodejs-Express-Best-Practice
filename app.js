// Configurations
require('dotenv').config();
// import libraries
const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// express app instance
const app = express();

// middleware
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(helmet());
app.use(cors());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });


// User 
const v1UserRoutes = require('./routes/v1/userRoutes');
const v2UserRoutes = require('./routes/v2/userRoutes');
app.use('/v1', v1UserRoutes);
app.use('/v2', v2UserRoutes);

// Auth
const v1AuthRoutes = require('./routes/v1/authRoutes');
app.use('/v1', v1AuthRoutes);

const versionMiddleware = require('./middleware/versioning');

// Versioned routes using middleware
app.use(versionMiddleware('v1')); // Default to v1

app.get('/checkVersion', (req, res) => {
  if (req.version === 'v1') {
    res.send('Response from v1');
  } else if (req.version === 'v2') {
    res.send('Response from v2');
  }
});

const port = process.env.APP_PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Best Practice Code for Node Js Express with MySql" });
});

app.listen(port, function (error) {
    if (error) throw error
    console.log("Server created Successfully on PORT", port);
  });
