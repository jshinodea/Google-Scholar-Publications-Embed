(() => {
  const styles = `
    .scholar-publications {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .publication-item {
      margin-bottom: 20px;
      padding: 15px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      background-color: #fff;
    }
    .publication-title {
      font-size: 18px;
      color: #2c3e50;
      margin-bottom: 8px;
    }
    .publication-authors {
      color: #666;
      margin-bottom: 4px;
    }
    .publication-meta {
      color: #888;
      font-size: 14px;
    }
    .publication-citations {
      color: #3498db;
      font-weight: 500;
    }
  `;

  // Add styles to document
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Parse BibTeX entry
  function parseBibtexEntry(entry) {
    const fields = {};
    const lines = entry.split('\n');
    
    // Get citation key
    const firstLine = lines[0];
    const match = firstLine.match(/@\w+{([^,]+),/);
    if (match) fields.citationKey = match[1];

    // Parse other fields
    lines.slice(1).forEach(line => {
      const fieldMatch = line.match(/\s*(\w+)\s*=\s*{([^}]*)}/);
      if (fieldMatch) {
        fields[fieldMatch[1]] = fieldMatch[2];
      }
    });

    return fields;
  }

  // Create publication element
  function createPublicationElement(publication) {
    const div = document.createElement('div');
    div.className = 'publication-item';
    
    div.innerHTML = `
      <div class="publication-title">${publication.title}</div>
      <div class="publication-authors">${publication.author}</div>
      <div class="publication-meta">
        ${publication.journal} (${publication.year})
        <span class="publication-citations">
          ${publication.citations} citations
        </span>
      </div>
    `;
    
    return div;
  }

  // Fetch and display publications
  async function loadPublications() {
    try {
      const scriptTag = document.currentScript || 
        document.querySelector('script[src*="embed.js"]');
      const baseUrl = new URL(scriptTag.src).origin;
      
      const response = await fetch(`${baseUrl}/publications`);
      const data = await response.json();
      
      const container = document.createElement('div');
      container.className = 'scholar-publications';
      
      // Parse BibTeX and create elements
      const entries = data.publications.split('\n\n')
        .filter(entry => entry.trim())
        .map(entry => parseBibtexEntry(entry))
        .sort((a, b) => (b.year || 0) - (a.year || 0));
      
      entries.forEach(pub => {
        container.appendChild(createPublicationElement(pub));
      });
      
      // Insert after script tag
      scriptTag.parentNode.insertBefore(container, scriptTag.nextSibling);
    } catch (error) {
      console.error('Error loading publications:', error);
    }
  }

  // Load publications when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPublications);
  } else {
    loadPublications();
  }
})(); 