const path = require('path');
const express = require('express');

//tools for security
const rateLimit = require('express-rate-limit');
const helmet = require('helmet'); // For Security HTTP headers
const morgan = require('morgan'); //Logging middleware
const mongoSanitizer = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser'); // to parse cookie from incoming request
const compression = require('compression');

//Routers
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//Start express app
const app = express();

app.enable('trust proxy');

//setting view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//1) GLOBAL MIDDLEWARES

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Set Security HTTP headers
//comment it coz there are some issues in when using script src
/**app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'data:'],
      scriptSrc: ["'self'", 'https://*.cloudflare.com'],
      scriptSrc: ["'self'", 'https://*.stripe.com'],
      frameSrc: ["'self'", 'https://*.stripe.com'],
      objectSrc: ["'none'"],
      // styleSrc: ["'self'", 'https:', 'unsafe-inline'],
      upgradeInsecureRequests: [],
    },
  }
  )
);**/

//Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const data = {
  message: 'Too many request from this IP,please try again in an hour!',
};
//request limiting using express-rate-limit to prevent brute force attack
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: data,
});
//Limit requets from same IP
app.use('/api', limiter);

//Body parser,readind data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));
//Cookie Parser
app.use(cookieParser());

//Data sanitization against NoSQL query injection
app.use(mongoSanitizer());

//Data sanitization against XSS
app.use(xss());

//Prevent Http parameters pollution
//can give whitelist for letting duplicate fields
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //log cookies sent from client side
  //console.log(req.cookies);
  next();
});

//3) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/', viewRouter);

//Handling undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// 4) START SERVER

module.exports = app;
