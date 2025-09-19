const themes = {
  default: {
    background: '#fffefe',
    border: '#e4e2e2',
    stroke: '#e4e2e2',
    ring: '#4c71f2',
    fire: '#4c71f2',
    currStreakNum: '#000000',
    sideNums: '#000000',
    sideLabels: '#000000',
    dates: '#000000'
  },
  
  radical: {
    background: '#141321',
    border: '#E4E2E2',
    stroke: '#E4E2E2',
    ring: '#FE428E',
    fire: '#FE428E',
    currStreakNum: '#F8D847',
    sideNums: '#FE428E',
    sideLabels: '#FE428E',
    dates: '#A9FEF7'
  },

  dark: {
    background: '#0d1117',
    border: '#30363d',
    stroke: '#30363d',
    ring: '#f78166',
    fire: '#f78166',
    currStreakNum: '#ffd700',
    sideNums: '#f0f6fc',
    sideLabels: '#8b949e',
    dates: '#8b949e'
  },

  highcontrast: {
    background: '#000000',
    border: '#ffffff',
    stroke: '#ffffff',
    ring: '#ffffff',
    fire: '#ffffff',
    currStreakNum: '#ffffff',
    sideNums: '#ffffff',
    sideLabels: '#ffffff',
    dates: '#ffffff'
  },

  ocean: {
    background: '#0e4b99',
    border: '#2f81f7',
    stroke: '#2f81f7',
    ring: '#2f81f7',
    fire: '#2f81f7',
    currStreakNum: '#ffffff',
    sideNums: '#ffffff',
    sideLabels: '#ffffff',
    dates: '#79c0ff'
  },

  vue: {
    background: '#273849',
    border: '#4fc08d',
    stroke: '#4fc08d',
    ring: '#4fc08d',
    fire: '#4fc08d',
    currStreakNum: '#41b883',
    sideNums: '#41b883',
    sideLabels: '#ffffff',
    dates: '#ffffff'
  }
};

function getTheme(themeName) {
  return themes[themeName] || themes.default;
}

function getAvailableThemes() {
  return Object.keys(themes);
}

module.exports = {
  getTheme,
  getAvailableThemes,
  themes
};