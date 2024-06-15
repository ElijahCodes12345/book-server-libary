const fs = require('fs').promises;
const dataFilePath = './data.json';

// Helper function to read data from file
const readData = async () => {
    const data = await fs.readFile(dataFilePath);
    return JSON.parse(data);
};

// Helper function to write data to file
const writeData = async (data) => {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
};

exports.createBook = async (req, res) => {
    const { title, author } = req.body;

    try {
        const data = await readData();
        const newBook = { id: Date.now(), title, author, loanedTo: null };
        data.books.push(newBook);
        await writeData(data);

        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await readData();
        const bookIndex = data.books.findIndex(book => book.id === parseInt(id));

        if (bookIndex === -1) {
            return res.status(404).json({ error: 'Book not found' });
        }

        data.books.splice(bookIndex, 1);
        await writeData(data);

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.loanOutBook = async (req, res) => {
    const { bookId, username } = req.body;

    try {
        const data = await readData();
        const book = data.books.find(book => book.id === parseInt(bookId));
        const user = data.users.find(user => user.username === username);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (book.loanedTo) {
            return res.status(400).json({ error: 'Book is already loaned out' });
        }

        book.loanedTo = username;
        await writeData(data);

        res.status(200).json({ message: 'Book loaned out successfully', book });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.returnBook = async (req, res) => {
    const { bookId } = req.body;

    try {
        const data = await readData();
        const book = data.books.find(book => book.id === parseInt(bookId));

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        if (!book.loanedTo) {
            return res.status(400).json({ error: 'Book is not currently loaned out' });
        }

        book.loanedTo = null;
        await writeData(data);

        res.status(200).json({ message: 'Book returned successfully', book });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;

    try {
        const data = await readData();
        const book = data.books.find(book => book.id === parseInt(id));

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        if (title) book.title = title;
        if (author) book.author = author;

        await writeData(data);

        res.status(200).json({ message: 'Book updated successfully', book });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const data = await readData();
        res.status(200).json(data.books);
    }
    catch {
        res.status(500).json({message: "Internal Server Error"});
    }
}