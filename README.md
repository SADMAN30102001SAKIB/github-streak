# GitHub Streak Stats 🔥

A Node.js service that generates beautiful SVG GitHub contribution streak statistics, similar to [github-readme-streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats).

✅ But unlike the original, it's always available - No more "service down" issues

## ✨ Features

- 🎨 **Beautiful SVG badges** with smooth animations
- 🌈 **Multiple themes** (radical, dark, ocean, vue, and more)
- 📊 **Real-time GitHub data** via GraphQL API
- 🔥 **Streak calculations** (current & longest streaks)
- 🚀 **Fast & lightweight** Express.js server
- 🎯 **Easy to deploy** on any platform

## 🎯 Live Example

Once your server is running, you can use it like this:

```
http://localhost:3000/?user=SADMAN30102001SAKIB&theme=radical
```

![Example](http://localhost:3000/?user=SADMAN30102001SAKIB&theme=radical)

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd github-streak-stats
npm install
```

### 2. Setup Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your GitHub token
# Get one from: https://github.com/settings/tokens
```

### 3. Run the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Your server will be running at `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | ✅ | Your GitHub Personal Access Token |
| `PORT` | ❌ | Server port (default: 3000) |

### Getting a GitHub Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name and select scopes:
   - For **public repos only**: `public_repo`
   - For **private repos**: `repo`
4. Copy the token and add it to your `.env` file

## 🎨 Available Themes

| Theme | Preview |
|-------|---------|
| `default` | Clean light theme |
| `radical` | 🌈 Pink & purple |
| `dark` | 🌙 GitHub dark theme |
| `highcontrast` | ⚫ High contrast black & white |
| `ocean` | 🌊 Ocean blue theme |
| `vue` | 💚 Vue.js inspired theme |

## 📖 Usage

### Basic Usage
```
GET /?user=username
```

### With Theme
```
GET /?user=username&theme=radical
```

### Examples
```
http://localhost:3000/?user=octocat&theme=radical
http://localhost:3000/?user=torvalds&theme=dark
http://localhost:3000/?user=gaearon&theme=vue
```

## 🏗️ Project Structure

```
github-streak-stats/
├── src/
│   ├── githubAPI.js          # GitHub GraphQL API integration
│   ├── streakCalculator.js   # Streak calculation logic
│   └── svgGenerator.js       # SVG generation with themes
├── themes/
│   └── index.js              # Theme definitions
├── .env                      # (make it)
├── server.js                 # Express.js server
├── package.json              # Dependencies & scripts
└── README.md                 # This file
```

## 🔧 API Endpoints

### `GET /`
- Returns streak stats SVG for specified user
- Query params: `user` (required), `theme` (optional)

### `GET /themes`
- Returns list of available themes

## 📊 What it Tracks

- **Total Contributions**: All-time contribution count
- **Current Streak**: Days with consecutive contributions (ending today or yesterday)
- **Longest Streak**: Longest consecutive contribution period ever
- **Date Ranges**: Formatted date ranges for streaks

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Heroku
```bash
heroku create your-app-name
heroku config:set GITHUB_TOKEN=your_token_here
git push heroku main
```

### Deploy to Railway
```bash
railway login
railway init
railway add
railway deploy
```

### Environment Variables for Deployment
Don't forget to set `GITHUB_TOKEN` in your deployment platform!

## 🛠️ Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload

### Adding New Themes
1. Edit `themes/index.js`
2. Add your theme object with color properties
3. Restart the server

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this project however you'd like!

## 🙋‍♂️ Support

If you encounter any issues:
1. Check that your `GITHUB_TOKEN` is valid
2. Ensure the username exists on GitHub
3. Check the server logs for detailed error messages

## 🎉 Credits

Inspired by [github-readme-streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats) by DenverCoder1.

---

**Happy Coding! 🔥**