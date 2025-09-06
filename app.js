const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});
 
app.get('/lifepill', (req, res) => {
    res.send('Life Pill Route');
});
app.listen(8085, ()    => {
    console.log('Server is running on port 8085');
}); 