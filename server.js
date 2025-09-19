require('dotenv').config();
const express = require('express');
const GitHubAPI = require('./src/githubAPI');
const StreakCalculator = require('./src/streakCalculator');
const SVGGenerator = require('./src/svgGenerator');
const { getTheme, getAvailableThemes } = require('./themes');

const app = express();
const PORT = process.env.PORT || 3000;

// GitHub API instance
const githubAPI = new GitHubAPI(process.env.GITHUB_TOKEN);

// Middleware
app.use(express.json());

// Set CORS headers for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Main streak stats endpoint
app.get('/', async (req, res) => {
  try {
    const { user, theme = 'default' } = req.query;

    if (!user) {
      return res.status(400).json({
        error: 'Username is required',
        usage: 'GET /?user=username&theme=theme_name',
        examples: [
            '/?user=SADMAN30102001SAKIB&theme=radical',
            '/?user=SADMAN30102001SAKIB&theme=dark',
            '/?user=SADMAN30102001SAKIB' // uses default theme
        ],
        availableThemes: getAvailableThemes()
      });
    }

    if (!process.env.GITHUB_TOKEN) {
      return res.status(500).json({
        error: 'GitHub token not configured',
        message: 'Please set GITHUB_TOKEN environment variable'
      });
    }

    // Fetch user contributions
    console.log(`Fetching contributions for user: ${user}`);
    const contributionData = await githubAPI.getAllTimeContributions(user);

    // Calculate streaks
    const streakStats = StreakCalculator.calculateStreaks(contributionData.contributions);

    // Prepare data for SVG generation
    const stats = {
      totalContributions: contributionData.totalContributions,
      currentStreak: streakStats.currentStreak,
      longestStreak: streakStats.longestStreak,
      contributionRange: StreakCalculator.getContributionRange(contributionData.firstContributionDate),
      currentStreakRange: StreakCalculator.formatDateRange(
        streakStats.currentStreakStart, 
        streakStats.currentStreakEnd
      ) || 'No current streak',
      longestStreakRange: StreakCalculator.formatDateRange(
        streakStats.longestStreakStart, 
        streakStats.longestStreakEnd
      ) || 'No streak yet'
    };

    // Generate SVG
    const selectedTheme = getTheme(theme);
    const svgGenerator = new SVGGenerator(selectedTheme);
    const svg = svgGenerator.generateSVG(stats);

    // Set response headers for SVG
    res.set({
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'max-age=3600' // Cache for 1 hour
    });

    res.send(svg);

  } catch (error) {
    console.error('Error generating streak stats:', error);
    
    // Return error SVG instead of JSON for better UX
    const errorSvg = generateErrorSVG(error.message);
    res.set('Content-Type', 'image/svg+xml');
    res.status(500).send(errorSvg);
  }
});

// Themes endpoint
app.get('/themes', (req, res) => {
  res.json({
    availableThemes: getAvailableThemes(),
    default: 'default'
  });
});

// Error SVG generator
function generateErrorSVG(message) {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='495' height='195' viewBox='0 0 495 195'>
    <rect width='495' height='195' fill='#ff6b6b' rx='4.5'/>
    <text x='247.5' y='100' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-size='14' font-weight='bold'>
      Error: ${message}
    </text>
  </svg>`;
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GitHub Streak Stats Server running on port ${PORT}`);
  console.log(`📊 Example: http://localhost:${PORT}/?user=SADMAN30102001SAKIB&theme=radical`);
  
  if (!process.env.GITHUB_TOKEN) {
    console.warn('⚠️  GITHUB_TOKEN not set. Please add it to your .env file for the service to work.');
  }
});

module.exports = app;