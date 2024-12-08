# Google Scholar to Embed

This project combines two functionalities:
1. Automatically fetching publications from Google Scholar profiles and converting them to BibTeX format
2. Generating an embeddable script that displays the publications on any website

## Features
- Daily automatic updates of publication data
- Simple embedding via a single script tag
- Customizable display options
- Automatic BibTeX generation from Google Scholar
- Render.com deployment ready

## Prerequisites
- Docker
- Node.js (for local development)
- SERPAPI API key (get one at https://serpapi.com)
- Render.com account
- Google Scholar profile URL

## Environment Variables
The following environment variables are required:

- `SERPAPI_KEY`: Your SERPAPI API key for accessing Google Scholar data
- `GOOGLE_SCHOLAR_URL`: Full URL of your Google Scholar profile (e.g., https://scholar.google.com/citations?user=YOUR_USER_ID)

For local development:
1. Copy `.env.example` to `.env`
2. Fill in your actual values in `.env`

For Render deployment:
1. Add these environment variables in your Render dashboard for both:
   - Web Service
   - Cron Job

## Local Development
1. Clone the repository

```bash
git clone https://github.com/yourusername/google_scholar_embed.git
cd google_scholar_embed
```

2. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your values
```

3. Install dependencies

```bash
npm install
```

4. Run with Docker

```bash
docker-compose up
```

## Deployment
1. Create a new Web Service on Render.com
2. Link your GitHub repository
3. Add environment variables in Render dashboard:
   - `SERPAPI_KEY`
   - `GOOGLE_SCHOLAR_URL`
4. Create a Cron Job for daily updates with the same environment variables

## Usage
Add this script tag to your HTML:

```html
<script src="https://your-render-service.onrender.com/embed.js"></script>
```

## Architecture
- Cron Job Service: Runs daily to fetch and update publication data
- Web Service: Serves the embeddable script and publication data
- Shared Storage: Maintains the latest publication data

## Contributing
Pull requests are welcome. For major changes, please open an issue first.

## License
MIT 