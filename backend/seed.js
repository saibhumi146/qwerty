const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

(async () => {
    const db = await open({
        filename: path.join(__dirname, 'collabify.db'),
        driver: sqlite3.Database
    });

    const profiles = [
        { name: "Dr. Arrav Sharma", field: "AI & Ethics", college: "IIT Bombay", country: "India", interests: ["Neural Networks", "SDG 9: Innovation"], skills: ["Python", "TensorFlow"], idea: "Sustainable Mission: Reducing the carbon footprint of large AI model training." },
        { name: "Sarah Jenkins", field: "Marine Biology", college: "Stanford University", country: "USA", interests: ["Ocean Health", "SDG 14: Life Below Water"], skills: ["Data Analysis", "GIS"], idea: "Sustainable Mission: Tracking coral reef bleaching to protect marine biodiversity." },
        { name: "Prof. Rajesh Kupra", field: "Cybersecurity", college: "COEP Pune", country: "India", interests: ["Blockchain", "SDG 16: Peace & Justice"], skills: ["Solidity", "C++"], idea: "Sustainable Mission: Creating secure, transparent e-governance tools for developing nations." },
        { name: "Meera Deshmukh", field: "Biotechnology", college: "AISSMS IOIT", country: "India", interests: ["Genetics", "SDG 2: Zero Hunger"], skills: ["CRISPR", "Lab Research"], idea: "Sustainable Mission: Developing heat-resistant seeds for farmers affected by climate change." },
        { name: "Liam O'Connor", field: "Renewable Energy", college: "University of Dublin", country: "Ireland", interests: ["Wind Turbines", "SDG 7: Clean Energy"], skills: ["MATLAB", "Fluid Dynamics"], idea: "Sustainable Mission: Optimizing offshore wind farm efficiency for green grid transition." },
        { name: "Chen Wei", field: "Urban Planning", college: "Tsinghua University", country: "China", interests: ["Smart Cities", "SDG 11: Sustainable Cities"], skills: ["AutoCAD", "IoT"], idea: "Sustainable Mission: Designing 'Sponge Cities' to manage urban flooding naturally." },
        { name: "Elena Rodriguez", field: "Public Health", college: "University of Madrid", country: "Spain", interests: ["Epidemiology", "SDG 3: Good Health"], skills: ["Statistics", "Public Policy"], idea: "Sustainable Mission: Universal vaccine distribution strategies for underserved Mediterranean regions." },
        { name: "Dr. Amina Yusuf", field: "Hydrology", college: "University of Nairobi", country: "Kenya", interests: ["Water Scarcity", "SDG 6: Clean Water"], skills: ["Hydraulic Modeling"], idea: "Sustainable Mission: Low-cost solar desalination systems for drought-hit communities." },
        { name: "Yuki Tanaka", field: "Material Science", college: "University of Tokyo", country: "Japan", interests: ["Biodegradable Plastics", "SDG 12: Consumption"], skills: ["Chemistry", "Nanotech"], idea: "Sustainable Mission: Converting seafood waste into eco-friendly packaging materials." },
        { name: "Anish Kulkarni", field: "Economics", college: "Symbiosis Pune", country: "India", interests: ["Microfinance", "SDG 1: No Poverty"], skills: ["Econometrics", "Python"], idea: "Sustainable Mission: Digital literacy programs to increase financial inclusion for rural women." },
        { name: "Sofia Muller", field: "Education Tech", college: "TU Munich", country: "Germany", interests: ["E-Learning", "SDG 4: Quality Education"], skills: ["React", "UI/UX"], idea: "Sustainable Mission: Offline-first educational apps for schools without stable internet." },
        { name: "James Miller", field: "Mechanical Engineering", college: "MIT", country: "USA", interests: ["Electric Vehicles", "SDG 13: Climate Action"], skills: ["CAD", "Thermodynamics"], idea: "Sustainable Mission: Improving solid-state battery life to accelerate EV adoption." },
        { name: "Priya Nair", field: "Sociology", college: "JNU Delhi", country: "India", interests: ["Gender Equality", "SDG 5: Gender Equality"], skills: ["Qualitative Research"], idea: "Sustainable Mission: Mapping the impact of climate migration on women in coastal India." },
        { name: "Lucas Silva", field: "Forestry", college: "Uni of São Paulo", country: "Brazil", interests: ["Reforestation", "SDG 15: Life on Land"], skills: ["Remote Sensing"], idea: "Sustainable Mission: Using satellite AI to detect illegal logging in the Amazon in real-time." },
        { name: "Fatima Al-Sayed", field: "Architecture", college: "American Uni of Beirut", country: "Lebanon", interests: ["Green Building", "SDG 11: Cities"], skills: ["Revit", "Sustainability Audit"], idea: "Sustainable Mission: Retrofitting ancient architecture with modern cooling systems to save energy." },
        { name: "David Kim", field: "Data Science", college: "Seoul National Uni", country: "South Korea", interests: ["Supply Chain", "SDG 9: Industry"], skills: ["SQL", "Big Data"], idea: "Sustainable Mission: Reducing logistics waste through AI-optimized route planning." },
        { name: "Zahra Mansour", field: "Chemical Engineering", college: "Cairo University", country: "Egypt", interests: ["Carbon Capture", "SDG 13: Climate Action"], skills: ["Chemical Kinetics"], idea: "Sustainable Mission: Low-energy methods for capturing CO2 directly from industrial exhausts." },
        { name: "Oliver Bennett", field: "Zoology", college: "Oxford University", country: "UK", interests: ["Wildlife Conservation", "SDG 15: Life on Land"], skills: ["Field Research"], idea: "Sustainable Mission: Protecting endangered pollinator species to ensure global food security." },
        { name: "Siddharth Rao", field: "Software Engineering", college: "PICT Pune", country: "India", interests: ["Open Source", "SDG 17: Partnerships"], skills: ["JavaScript", "Cloud"], idea: "Sustainable Mission: Building open-source collaboration tools for non-profit research teams." },
        { name: "Grace Hopper II", field: "Information Tech", college: "AISSMS IOIT", country: "India", interests: ["Green IT", "SDG 12: Consumption"], skills: ["Server Optimization"], idea: "Sustainable Mission: Designing energy-efficient data storage algorithms for sustainable tech." }
    ];

    // Clear existing data first so you don't get duplicates
    await db.run('DELETE FROM profiles');

    for (const p of profiles) {
        await db.run(
            `INSERT INTO profiles (name, field, college, country, interests, skills, idea) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [p.name, p.field, p.college, p.country, JSON.stringify(p.interests), JSON.stringify(p.skills), p.idea]
        );
    }

    console.log("Database seeded with 20 SDG-focused researchers!");
    process.exit();
})();