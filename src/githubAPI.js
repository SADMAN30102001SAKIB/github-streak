const axios = require('axios');

class GitHubAPI {
  constructor(token) {
    this.token = token;
    this.baseURL = 'https://api.github.com/graphql';
  }

  async getUserContributions(username, year = new Date().getFullYear()) {
    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      username,
      from: `${year}-01-01T00:00:00Z`,
      to: `${year}-12-31T23:59:59Z`
    };

    try {
      const response = await axios.post(this.baseURL, {
        query,
        variables
      }, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      return response.data.data.user.contributionsCollection;
    } catch (error) {
      throw new Error(`GitHub API Error: ${error.message}`);
    }
  }

  async getAllTimeContributions(username) {
    // Get contributions for the last 4 years to ensure we capture all activity
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];
    
    let allContributions = [];
    let totalContributions = 0;
    let firstContributionDate = null;

    for (const year of years) {
      try {
        const contributions = await this.getUserContributions(username, year);
        
        // Extract daily contributions
        for (const week of contributions.contributionCalendar.weeks) {
          for (const day of week.contributionDays) {
            if (day.contributionCount > 0) {
              allContributions.push({
                date: day.date,
                count: day.contributionCount
              });
              
              if (!firstContributionDate || day.date < firstContributionDate) {
                firstContributionDate = day.date;
              }
            }
          }
        }
        
        totalContributions += contributions.contributionCalendar.totalContributions;
      } catch (error) {
        console.warn(`Could not fetch contributions for year ${year}: ${error.message}`);
      }
    }

    // Sort contributions by date
    allContributions.sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      contributions: allContributions,
      totalContributions,
      firstContributionDate
    };
  }
}

module.exports = GitHubAPI;