const express = require('express');
const app = express();

// Middleware
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method} ${req.url}`);
  next();
};

// Middleware for authentication
const authenticateUser = (req, res, next) => {
  const isLoggedIn = true; 
  if (isLoggedIn) {
    next();
  } else {
    res.status(401).send('Unauthorized. Please log in.');
  }
};

// Import route files
const ecommerceRoutes = require('./routes/ecommerceRoutes');
const passwordStrengthRoutes = require('./routes/passwordStrengthRoutes');

// Mount routes
app.use('/ecommerce', authenticateUser, ecommerceRoutes);
app.use('/password', passwordStrengthRoutes);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggerMiddleware);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
