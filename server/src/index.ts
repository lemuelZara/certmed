import express from 'express';

const server = express();

server.use(express.json());

server.get('/', (req, res) => res.status(200).json({ message: 'Welcome' }));

server.listen(9898);
