# Movie Recommendation Web Application

A full-stack movie recommendation system with an interactive web interface. Search for a movie and get 12 similar recommendations with posters, details, and TMDB integration.

## Live Demo

Deployed at: `https://prabin-movie-recommendation.onrender.com`

## Project Overview

This web app combines a content-based recommendation system with a modern UI. Users can search for movies, view detailed information, and discover similar titles with movie posters fetched from TMDB API.

## Features

- **Smart Search**: Case-insensitive, punctuation-ignoring search
- **Movie Details**: Displays poster, release date, genres, popularity, and overview
- **12 Recommendations**: Get similar movies instantly
- **TMDB Integration**: Real-time poster and metadata from TMDB API
- **Responsive Design**: Works on desktop and mobile
- **Interactive UI**: Click to expand, search from anywhere
- **Error Handling**: Clear messages for movies not in database
- **Smooth Navigation**: Two-view system (home and detail page)

## Project Structure

```
.
├── app.py                  # Flask backend
├── requirements.txt        # Python dependencies
├── templates/
│   └── index.html         # Main HTML page
├── static/
│   ├── style.css          # Styling and responsive design
│   ├── script.js          # Frontend logic and API calls
│   └── Replacement.png    # Fallback poster image
├── indices.pkl            # Title-to-index mapping
├── vectorized_matrix.pkl  # TF-IDF matrix
├── df.pkl                 # Processed movie dataframe
└── README.md              # This file
```

## Tech Stack

**Backend:**
- Flask (web framework)
- scikit-learn (cosine similarity)
- NumPy (array operations)
- Pandas (data handling)
- Pickle (model persistence)
- Gunicorn (production server)

**Frontend:**
- HTML5 + CSS3
- Vanilla JavaScript (ES6+)
- TMDB API (posters and metadata)
- Font Awesome (icons)
- Google Fonts (Inter font)

## Requirements

See `requirements.txt`:
```
Flask==3.1.2
numpy==2.3.4
pandas==2.3.3
scikit-learn==1.7.2
joblib==1.5.2
Pillow==12.0.0
gunicorn==21.2.0
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-folder>
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Ensure you have the pickle files:
   - `indices.pkl`
   - `vectorized_matrix.pkl`
   - `df.pkl`

## Running Locally

Start the Flask server:
```bash
python app.py
```

Visit `http://localhost:5000` in your browser.

## Running in Production

Use Gunicorn:
```bash
gunicorn app:app
```

Or with custom settings:
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## How It Works

### Backend (Flask)

**Routes:**

1. **GET `/`** - Serves the main HTML page

2. **POST `/predict`** - Returns movie recommendations
   - Input: Movie title (form data)
   - Process: Normalizes title, finds index, calculates similarity
   - Output: JSON with 12 movie titles

**Recommendation Algorithm:**
1. Normalizes search query (lowercase, remove punctuation)
2. Finds movie index in database
3. Calculates cosine similarity with all movies
4. Returns top 12 most similar movies

### Frontend (JavaScript)

**Two-View System:**

**Home View:**
- Shows popular movies grid (12 movies)
- Search bar at top
- Click "Open" to see recommendations

**Detail View:**
- Large movie poster and details
- 12 recommended movies grid
- Search bar to find more movies
- Home button to return

**Key Features:**
- Dynamic poster loading from TMDB
- Real-time search with Enter key support
- Clear button for search input
- Expand button on hover
- Smooth scrolling and transitions
- Error handling with helpful messages

**TMDB Integration:**
- Fetches movie posters
- Gets release dates, genres, popularity, overview
- Uses fallback image if poster unavailable
- API key embedded in code

## User Interface

**Home Page:**
- Search bar with home icon
- Popular movies grid (4 columns)
- Each movie tile shows poster, title, and "Open" button
- Hover to see expand button

**Detail Page:**
- Movie poster on left (desktop) or top (mobile)
- Movie details on right:
  - Title
  - Release date
  - Genres
  - Popularity rating
  - Overview
- 12 recommended movies below
- Search bar to find more movies

**Responsive Design:**
- Desktop: 4-column grid
- Mobile: 2-column grid
- Adaptive layout for movie details
- Touch-friendly buttons

## API Endpoints

### Backend Endpoint

**POST `/predict`**

Request:
```
Content-Type: application/x-www-form-urlencoded
Body: text=<movie_title>
```

Success Response:
```json
{
  "prediction": [
    "Movie Title 1",
    "Movie Title 2",
    ...
  ]
}
```

Error Response:
```json
{
  "prediction": ["err"]
}
```

### TMDB API (Used by Frontend)

The frontend calls TMDB API directly:
- Search: `https://api.themoviedb.org/3/search/movie`
- API Key: `5cd52bd2e9a5890c00a128230bb04996`
- Gets: posters, genres, release dates, popularity

## Dataset

- ~4800 English movies (1916-2016)
- TMDB 5000 dataset
- Content-based filtering using genres, keywords, cast, director, plot

## Features Explained

**Search Functionality:**
- Type movie name and press Enter or click search icon
- Case-insensitive (works for "avatar", "AVATAR", "Avatar")
- Ignores punctuation (works for "Dont Breathe" or "Don't Breathe")
- Clear button appears when typing

**Movie Tiles:**
- Hover to see expand button (desktop only)
- Click "Open" or expand to view details and recommendations
- Posters loaded dynamically from TMDB

**Navigation:**
- Home button returns to main page
- Search available on both pages
- Smooth scrolling to top/bottom

**Error Handling:**
- Movie not found → Shows helpful error message
- Explains database limitations
- Suggests checking spelling

## Styling Highlights

**Colors:**
- Primary: #007bff (blue)
- Hover: #0056b3
- Background: #fcfcfc
- Text: #1a1a1a, #64748b

**Fonts:**
- Main: Inter (Google Fonts)
- Info: Monospace

**Layout:**
- Grid-based responsive design
- Flexbox for centering
- Smooth transitions

## Limitations

- Database contains only ~4800 movies
- Movies from 1916-2016 (no recent releases)
- English titles only
- Requires exact or close title match
- TMDB API rate limits apply

## Future Improvements

- Add fuzzy search for better title matching
- Include more recent movies
- Add user ratings and reviews
- Implement collaborative filtering
- Add movie trailers
- Save favorite movies
- Filter by genre, year, rating

## Deployment

Deployed on **Render** with:
- Auto-deploy from Git
- Environment variables for API keys
- Gunicorn as production server

## TMDB API

The app uses TMDB API for:
- Movie posters
- Release dates
- Genres
- Popularity scores
- Plot overviews

API is free but rate-limited. For production, consider:
- Caching responses
- Your own API key
- Error handling for API failures

## Troubleshooting

**Movie not found:**
- Check spelling
- Try without special characters
- Movie must be in 1916-2016 range
- Must be English title

**Posters not loading:**
- Check internet connection
- TMDB API might be down
- Fallback image will show

**Slow performance:**
- First search after restart is slower (loading models)
- TMDB API calls take time
- Network latency

## Credits

- Dataset: TMDB 5000 Movie Dataset
- Posters: The Movie Database (TMDB)
- Icons: Font Awesome
- Font: Google Fonts (Inter)
- Deployed on Render

## License

Open source - available for educational purposes.
