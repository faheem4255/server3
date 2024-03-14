const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host     : 'localhost', // or your MySQL host
  user     : 'faheem',
  password : 'faheem@709213#',
  database : 'myschooldb'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

// Define the calculate route
app.get('/calculate', (req, res) => {
    const { number1, number2 } = req.query;
    const sum = Number(number1) + Number(number2); // or perform multiplication based on your logic

    // SQL to insert numbers and sum into the database
    const query = 'INSERT INTO calculations (number1, number2, result) VALUES (?, ?, ?)';
    db.query(query, [number1, number2, sum], (err, result) => {
      if (err) throw err;

      // Respond with the sum after successful insertion
      res.json({ sum });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
