import express from 'express';

const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.get('/about', (req, res) => {
    res.json({message:'Welcome to about!'})
})

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`)
})