const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const mealRoutes = require('./src/routes/mealRoutes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
 
app.get('/lifepill', (req, res) => {
    res.send('Life Pill Route');
});
app.use('/users', userRoutes);

app.use('/meals', mealRoutes);

app.listen(8085, ()    => {
    console.log('Server is running on port 8085');
}); 