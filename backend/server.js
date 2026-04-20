const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

let db;

// 1. Initialize SQLite Database
(async () => {
    try {
        db = await open({
            filename: path.join(__dirname, 'collabify.db'),
            driver: sqlite3.Database
        });

        // 2. Create Tables for Profiles and Ideas
        await db.exec(`
            CREATE TABLE IF NOT EXISTS profiles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                field TEXT,
                college TEXT,
                country TEXT,
                interests TEXT,
                skills TEXT,
                idea TEXT
            );
            CREATE TABLE IF NOT EXISTS ideas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                description TEXT,
                field TEXT,
                author TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Database Ready: collabify.db created.");
    } catch (err) {
        console.error("Database failed to initialize:", err);
    }
})();

// --- API ROUTES ---

// SAVE PROFILE
app.post('/api/profiles', async (req, res) => {
    const { name, field, college, country, interests, skills, idea } = req.body;
    try {
        await db.run(
            `INSERT INTO profiles (name, field, college, country, interests, skills, idea) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, field, college, country, JSON.stringify(interests), JSON.stringify(skills), idea]
        );
        res.status(201).json({ message: "Profile saved!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET PROFILES (With Search)
app.get('/api/profiles', async (req, res) => {
    const searchTerm = req.query.search;
    let rows;

    try {
        if (searchTerm) {
            const query = `
                SELECT * FROM profiles 
                WHERE name LIKE ? 
                OR field LIKE ? 
                OR interests LIKE ? 
                OR skills LIKE ?
            `;
            const wildCard = `%${searchTerm}%`;
            rows = await db.all(query, [wildCard, wildCard, wildCard, wildCard]);
        } else {
            rows = await db.all('SELECT * FROM profiles');
        }

        const profiles = rows.map(row => ({
            ...row,
            interests: JSON.parse(row.interests || "[]"),
            skills: JSON.parse(row.skills || "[]")
        }));
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST IDEA
app.post('/api/ideas', async (req, res) => {
    const { title, description, field, author } = req.body;
    try {
        await db.run(
            `INSERT INTO ideas (title, description, field, author) VALUES (?, ?, ?, ?)`,
            [title, description, field, author]
        );
        res.status(201).json({ message: "Idea posted!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET IDEAS (With Search/Filter)
app.get('/api/ideas', async (req, res) => {
    const searchTerm = req.query.search;
    let ideas;

    try {
        if (searchTerm) {
            const query = `
                SELECT * FROM ideas 
                WHERE title LIKE ? 
                OR description LIKE ? 
                OR field LIKE ? 
                OR author LIKE ?
                ORDER BY createdAt DESC
            `;
            const wildCard = `%${searchTerm}%`;
            ideas = await db.all(query, [wildCard, wildCard, wildCard, wildCard]);
        } else {
            ideas = await db.all('SELECT * FROM ideas ORDER BY createdAt DESC');
        }
        res.json(ideas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));