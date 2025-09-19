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

    // Get today's date and yesterday's date
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

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
      checkDate = yesterday;
    }

    if (streakActive) {
      // Count backwards while there are consecutive contributions
      while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        
        if (contributionDates.has(dateStr)) {
          currentStreak++;
          currentStreakStart = dateStr;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let longestStreakStart = null;
    let longestStreakEnd = null;
    let tempStreak = 0;
    let tempStart = null;

    // Sort contributions by date to find consecutive days
    const sortedContributions = contributions.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (sortedContributions.length > 0) {
      let prevDate = null;
      
      for (const contribution of sortedContributions) {
        const currentDate = new Date(contribution.date);
        
        if (prevDate === null) {
          // First contribution
          tempStreak = 1;
          tempStart = contribution.date;
        } else {
          const daysDiff = (currentDate - prevDate) / (1000 * 60 * 60 * 24);
          
          if (daysDiff === 1) {
            // Consecutive day
            tempStreak++;
          } else {
            // Check if this temp streak is the longest so far
            if (tempStreak > longestStreak) {
              longestStreak = tempStreak;
              longestStreakStart = tempStart;
              longestStreakEnd = prevDate.toISOString().split('T')[0];
            }
            
            // Start new streak
            tempStreak = 1;
            tempStart = contribution.date;
          }
        }
        
        prevDate = currentDate;
      }
      
      // Check the final temp streak
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

  static formatDateRange(startDate, endDate) {
    if (!startDate || !endDate) return '';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const formatDate = (date) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[date.getMonth()]} ${date.getDate()}`;
    };
    
    if (startDate === endDate) {
      return formatDate(start);
    }
    
    return `${formatDate(start)} - ${formatDate(end)}`;
  }

  static getContributionRange(firstContributionDate) {
    if (!firstContributionDate) return 'No contributions';
    
    const start = new Date(firstContributionDate);
    const now = new Date();
    
    const formatDate = (date) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };
    
    return `${formatDate(start)} - Present`;
  }
}

module.exports = StreakCalculator;