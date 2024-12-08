require('dotenv').config();
const { getJson } = require('serpapi');
const fs = require('fs').promises;
const path = require('path');

async function fetchPublications() {
  if (!process.env.SERPAPI_KEY || !process.env.GOOGLE_SCHOLAR_URL) {
    throw new Error('Missing required environment variables');
  }

  try {
    const params = {
      api_key: process.env.SERPAPI_KEY,
      engine: "google_scholar_author",
      author_id: process.env.GOOGLE_SCHOLAR_URL.split('user=')[1]?.split('&')[0],
      num: 100
    };

    const response = await getJson(params);
    return response.articles || [];
  } catch (error) {
    console.error('Error fetching from Google Scholar:', error);
    throw error;
  }
}

function convertToBibtex(publications) {
  return publications.map(pub => {
    const year = pub.year || 'n.d.';
    const authors = pub.authors?.join(' and ') || 'Unknown';
    const citationId = `${authors.split(' ')[0]}${year}${pub.title.split(' ')[0]}`;
    
    return `@article{${citationId},
  title={${pub.title}},
  author={${authors}},
  year={${year}},
  journal={${pub.publication || 'Unknown'}},
  citations={${pub.cited_by?.value || 0}}
}`;
  }).join('\n\n');
}

async function updatePublications() {
  try {
    console.log('Starting publications update...');
    
    // Fetch publications
    const publications = await fetchPublications();
    
    // Convert to BibTeX
    const bibtex = convertToBibtex(publications);
    
    // Write to shared disk
    const filePath = '/data/publications.bib';
    await fs.mkdir('/data', { recursive: true });
    await fs.writeFile(filePath, bibtex);
    
    console.log('Publications updated successfully at:', filePath);
  } catch (error) {
    console.error('Failed to update publications:', error);
    process.exit(1);
  }
}

// Run immediately if called directly
if (require.main === module) {
  updatePublications();
}

module.exports = { updatePublications }; 