const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.SERVER_PORT || 5000;
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
