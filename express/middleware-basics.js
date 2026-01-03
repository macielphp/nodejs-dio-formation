import express from 'express';

const app = express()
const port = 3000;

//logger middleware 
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('passed')
    next(); //pass control to next middleware
};

const postLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('POST request passed');
    next()
}

//apply middleware globally
app.use(logger);

app.post('*', postLogger)


app.get('/', (req, res) => {
    res.send('Check your console')
});

app.get('/about', (req, res) => {
    res.send('Time:', new Date());
});

app.get('/user', (req, res) => {
    res.send('Welcome to user login page')
})

app.post('/user', (req, res) => {
    res.json({message: 'User created'})
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});