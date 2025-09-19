class StreakCalculator {
  static calculateStreaks(contributions) {
    if (!contributions || contributions.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalContributions: 0,
        currentStreakStart: null,
        currentStreakEnd: null,
        longestStreakStart: null,
        longestStreakEnd: null
      };
    }

    // Create a set of contribution dates for fast lookup
    const contributionDates = new Set(contributions.map(c => c.date));
    
    // Calculate total contributions
    const totalContributions = contributions.reduce((sum, c) => sum + c.count, 0);

    // Get today's date and yesterday's date in UTC to match GitHub API
    const today = new Date();
    const todayStr = this.getDateString(today);
    const yesterday = new Date(today);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const yesterdayStr = this.getDateString(yesterday);

    // Calculate current streak
    let currentStreak = 0;
    let currentStreakStart = null;
    let currentStreakEnd = null;
    
    // Start from today and go backwards
    let checkDate = new Date(today);
    let streakActive = false;

    // Check if there's a contribution today or yesterday to start the streak
    if (contributionDates.has(todayStr)) {
      streakActive = true;
      currentStreakEnd = todayStr;
    } else if (contributionDates.has(yesterdayStr)) {
      streakActive = true;
      currentStreakEnd = yesterdayStr;
      checkDate = new Date(yesterday);
    }

    if (streakActive) {
      // Count backwards while there are consecutive contributions
      while (true) {
        const dateStr = this.getDateString(checkDate);
        
        if (contributionDates.has(dateStr)) {
          currentStreak++;
          currentStreakStart = dateStr;
          checkDate.setUTCDate(checkDate.getUTCDate() - 1);
        } else {
          break;
        }
      }
    }

    // Calculate longest streak using improved algorithm
    let longestStreak = 0;
    let longestStreakStart = null;
    let longestStreakEnd = null;

    // Sort contributions by date to find consecutive days
    const sortedContributions = contributions.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (sortedContributions.length > 0) {
      let tempStreak = 1;
      let tempStart = sortedContributions[0].date;
      
      for (let i = 1; i < sortedContributions.length; i++) {
        const currentDate = sortedContributions[i].date;
        const prevDate = sortedContributions[i - 1].date;
        
        // Check if dates are consecutive (using date arithmetic instead of time difference)
        if (this.isConsecutiveDay(prevDate, currentDate)) {
          tempStreak++;
        } else {
          // End of current streak, check if it's the longest
          if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
            longestStreakStart = tempStart;
            longestStreakEnd = sortedContributions[i - 1].date;
          }
          
          // Start new streak
          tempStreak = 1;
          tempStart = currentDate;
        }
      }
      
      // Check the final streak
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
        longestStreakStart = tempStart;
        longestStreakEnd = sortedContributions[sortedContributions.length - 1].date;
      }
    }

    return {
      currentStreak,
      longestStreak,
      totalContributions,
      currentStreakStart,
      currentStreakEnd,
      longestStreakStart,
      longestStreakEnd
    };
  }

  // Helper method to get date string in YYYY-MM-DD format using UTC
  static getDateString(date) {
    return date.toISOString().split('T')[0];
  }

  // Helper method to check if two date strings represent consecutive days
  static isConsecutiveDay(dateStr1, dateStr2) {
    const date1 = new Date(dateStr1 + 'T00:00:00.000Z');
    const date2 = new Date(dateStr2 + 'T00:00:00.000Z');
    
    // Calculate the difference in days
    const diffTime = date2.getTime() - date1.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays === 1;
  }

  static formatDateRange(startDate, endDate) {
    if (!startDate || !endDate) return '';
    
    // Ensure we're working with Date objects
    const start = new Date(startDate + 'T00:00:00.000Z');
    const end = new Date(endDate + 'T00:00:00.000Z');
    
    const formatDate = (date) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[date.getUTCMonth()]} ${date.getUTCDate()}`;
    };
    
    if (startDate === endDate) {
      return formatDate(start);
    }
    
    return `${formatDate(start)} - ${formatDate(end)}`;
  }

  static getContributionRange(firstContributionDate) {
    if (!firstContributionDate) return 'No contributions';
    
    const start = new Date(firstContributionDate + 'T00:00:00.000Z');
    const now = new Date();
    
    const formatDate = (date) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
    };
    
    return `${formatDate(start)} - Present`;
  }
}

module.exports = StreakCalculator;