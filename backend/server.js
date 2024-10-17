const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const createUsers = require('./helper/createUsers');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const appraisalRoutes = require('./routes/appraisalRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await createUsers();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appraisal', appraisalRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Appraisal System API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
