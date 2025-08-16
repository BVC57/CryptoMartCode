require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const itemRoutes = require('./src/routes/items');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(express.json({limit: '10kb'}));
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100
});
app.use(limiter);

// routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// connect to mongo and start
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
  console.log('Connected to MongoDB');
  app.listen(PORT, ()=> console.log('Server running on', PORT));
})
.catch(err => {
  console.error('Mongo connection error', err);
});
