const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const managerRoutes = require('./routes/managerRoutes');
const supervisorRoutes = require('./routes/supervisorRoutes');
const residentRoutes = require('./routes/residentRoutes');
const issueRoutes = require('./routes/issueRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const db = require('./config/db');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());

app.use('/api/admin', adminRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/supervisor', supervisorRoutes);
app.use('/api/resident', residentRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 3000

db.query('SELECT 1')
.then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => console.log('Failed to connect to database.\n' + err));
