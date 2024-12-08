require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Endpoint to serve the embed script
app.get('/embed.js', async (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  try {
    const embedScript = await fs.readFile(path.join(__dirname, '../../public/embed.js'), 'utf8');
    res.send(embedScript);
  } catch (error) {
    console.error('Error serving embed script:', error);
    res.status(500).send('console.error("Error loading publications");');
  }
});

// Endpoint to get publications data
app.get('/publications', async (req, res) => {
  try {
    const bibFile = await fs.readFile(path.join(__dirname, '../../data/publications.bib'), 'utf8');
    res.json({ publications: bibFile });
  } catch (error) {
    console.error('Error reading publications:', error);
    res.status(500).json({ error: 'Error loading publications' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 