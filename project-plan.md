# Google Scholar to Embed Integration Project

## Overview
This project combines two existing solutions:
1. scholar_to_bibtex: Converts Google Scholar profiles to BibTeX format
2. Bib-File-to-Embed: Generates embeddable publication lists from BibTeX files

## Architecture
- Cron Job Service (Running on Render)
  - Executes daily at midnight
  - Fetches Google Scholar profile
  - Generates updated BibTeX file
  - Stores the file for the web service

- Web Service (Running on Render)
  - Serves the embeddable script
  - Reads the latest BibTeX file
  - Generates dynamic publication list

## Implementation Plan

### Phase 1: Project Setup
- [ ] Initialize new repository
- [ ] Set up project structure
- [ ] Create Dockerfile for the combined solution
- [ ] Set up environment variables

### Phase 2: Integration
- [ ] Implement file storage solution
- [ ] Modify scholar_to_bibtex to store output
- [ ] Update Bib-File-to-Embed to read from storage
- [ ] Create shared configuration

### Phase 3: Render Deployment
- [ ] Set up Render web service
- [ ] Configure Render cron job
- [ ] Set up environment variables in Render
- [ ] Test complete workflow

## Configuration Requirements
- SERPAPI_KEY: For Google Scholar access
- GOOGLE_SCHOLAR_URL: Profile URL to fetch
- Storage configuration
- Render service configuration

## Usage
```html
<!-- Embed code will be in format: -->
<script src="https://your-render-service.onrender.com/embed.js"></script>
``` 