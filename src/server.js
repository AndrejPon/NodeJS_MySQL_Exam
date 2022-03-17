const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const groupsRoutes = require('./routes/groupsRoutes');
const accountsRoutes = require('./routes/accountsRoutes');
const billsRoutes = require('./routes/billsRoutes');

const PORT = process.env.SERVER_PORT || 5000;
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/', groupsRoutes);
app.use('/', accountsRoutes);
app.use('/', billsRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
