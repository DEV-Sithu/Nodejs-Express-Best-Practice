// config/logger.js
const morgan = require('morgan');
const winston = require('winston');

// HTTP logging
app.use(morgan('combined'));

// Application logging
const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});