const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyparser = require('body-parser');
const cors = require('cors');
const db = require('./config/database');
const routes = require('./routes/authRoutes');
const path = require('path');
const corsOptions = require('./config/corsOptions'); // Import your CORS options

// Enable CORS with your custom options
app.use(cors(corsOptions));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use('/api/auth', routes);


db.query('SELECT 1')
.then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => console.log('Failed to connect to database.\n' + err));
