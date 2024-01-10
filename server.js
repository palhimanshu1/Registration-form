const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000||process.env.PORT;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/register-form', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a mongoose schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', async (req, res) => {
    try {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
  
      await newUser.save();
      res.sendFile(__dirname + '/public/success.html'); // Redirect to success page
    } catch (error) {
      console.error(error);
      res.status(500).send('Error registering user.');
    }
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
