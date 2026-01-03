import express from 'express';

const app = express()
const port = 5000

app.get('/users', (req, res) => {
    res.json({ users: ['Alice', 'Bob']});
});

app.post('/users', (req, res) => {
    res.json({ message: 'User created'});
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `User ${id} updated`});
})

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Use ${id} deleted` });
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})