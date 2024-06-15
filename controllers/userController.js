const fs = require('fs').promises;
const dataFilePath = './data.json';

// Helper function to read data from file
const readData = async () => {
    const data = await fs.readFile(dataFilePath);

    console.log(JSON.parse(data));

    return JSON.parse(data);
};

// Helper function to write data to file
const writeData = async (data) => {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
};

exports.createUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const data = await readData();
        const existingUser = data.users.find(user => user.username === username);

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        console.log(username);

        data.users.push({ id: Date.now(), username, password });
        await writeData(data);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.authenticateUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const data = await readData();
        const user = data.users.find(user => user.username === username && user.password === password);

        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const data = await readData();
        res.status(200).json(data.users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
