const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

(async () => {
    const db = await open({
        filename: path.join(__dirname, 'collabify.db'),
        driver: sqlite3.Database
    });

    const ideas = [
        { title: "AI-Optimized Smart Grids", field: "Energy (SDG 7)", author: "Liam O'Connor", description: "Using machine learning to predict peak electricity demand to reduce energy waste." },
        { title: "Blockchain for Plastic Credits", field: "Environment (SDG 14)", author: "Sarah Jenkins", description: "A transparent ledger where companies pay local recyclers to collect ocean plastic." },
        { title: "Low-Cost Air Quality Drones", field: "Environment (SDG 13)", author: "Chen Wei", description: "Designing swarms of small drones to map industrial pollution hotspots in real-time." },
        { title: "Biodegradable Battery Prototypes", field: "Material Science (SDG 12)", author: "Yuki Tanaka", description: "Researching seaweed-based electrolytes to replace toxic lithium in electronics." },
        { title: "Smart Bin Sorting", field: "IoT (SDG 11)", author: "Fatima Al-Sayed", description: "An IoT bin using image recognition to automatically separate compostable waste." },
        { title: "Remote Neonatal Monitoring", field: "Healthcare (SDG 3)", author: "Elena Rodriguez", description: "Wearable sensors for infants in rural areas that alert doctors via SMS." },
        { title: "Ethical AI for Rare Diseases", field: "Data Science (SDG 3)", author: "Dr. Arrav Sharma", description: "Analyzing patient data using Federated Learning without compromising identity." },
        { title: "3D Printed Prosthetics Lab", field: "Mechanical (SDG 9)", author: "James Miller", description: "A mobile 'Lab-in-a-Box' that uses recycled plastic to print custom limbs." },
        { title: "Mental Health Sentiment Bot", field: "NLP (SDG 3)", author: "Priya Nair", description: "A tool that detects early signs of depression in regional language social posts." },
        { title: "AR-Based Vocational Training", field: "EdTech (SDG 4)", author: "Sofia Muller", description: "Using Augmented Reality to teach plumbing and electrical skills remotely." },
        { title: "Gamified Financial Literacy", field: "Economics (SDG 5)", author: "Anish Kulkarni", description: "Teaching investment to rural female entrepreneurs through mobile storytelling." },
        { title: "AI-Driven Braille Translator", field: "IT (SDG 10)", author: "David Kim", description: "A camera-based app that reads textbooks and converts them into Braille." },
        { title: "Pothole Detection via Crowd-Sourcing", field: "Smart Cities (SDG 11)", author: "Siddharth Rao", description: "Using smartphone accelerometers to automatically map road damage." },
        { title: "Vertical Farming Automation", field: "Agriculture (SDG 2)", author: "Meera Deshmukh", description: "Using IoT to monitor soil pH and moisture in high-density urban balcony farms." },
        { title: "Solar-Powered Public Wi-Fi Hubs", field: "Communication (SDG 9)", author: "Grace Hopper II", description: "Converting traditional booths into self-sustaining internet hotspots." }
    ];

    try {
        // Clear old ideas
        await db.run('DELETE FROM ideas');
        
        // Insert 15 new ideas
        for (const i of ideas) {
            await db.run(
                `INSERT INTO ideas (title, field, author, description) VALUES (?, ?, ?, ?)`,
                [i.title, i.field, i.author, i.description]
            );
        }

        console.log("--------------------------------------------------");
        console.log("SUCCESS: 15 SDG Research Ideas added to Idea Board!");
        console.log("--------------------------------------------------");
    } catch (err) {
        console.error("Error seeding ideas:", err);
    } finally {
        process.exit();
    }
})();