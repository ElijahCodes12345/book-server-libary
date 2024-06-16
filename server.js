const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to BookExpress');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
