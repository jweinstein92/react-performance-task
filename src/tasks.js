/**
 * Implement to complete Task 1
 *
 * The objective of the first task is to filter a provided list of events by name. The function
 * should take a list of events and a string of search text, and return a list of events filtered
 * by that search text.
 *
 * Search should be case-insensitive.
 * Source list of events should not be mutated.
 *
 * @param {Object[]} events
 * @param {string} searchText
 *
 * @returns {Object[]} List of filtered events
 */
export function filterEvents(events, searchText) {
  const matcher = new RegExp(searchText, "i");
  const filtered = events.filter(function(event) {
      return matcher.test(event.name);
  });

  return filtered;
}

/**
 * Implement to complete Task 2
 *
 * The objective of the second task is to get the average rating for an event. The function
 * should take an event and a list of all ratings and return the average as a float (to the
 * hundreth place).
 *
 * If an event has no ratings the function should return null.
 *
 * @param {Object} event
 * @param {Object[]} ratings
 *
 * @returns {mixed} Null if no ratings or the average rating of the event to the 100th place
 */
export function averageRatingForEvent(event, ratings) {
  const eventRatings = ratings.filter(function(rating) {
      return rating.eventId === event.id;
  });
  if (eventRatings.length === 0) {
      return null;
  }
  let sum = 0;
  for (let rating of eventRatings) {
      sum += rating.rating;
  }
  return (Math.ceil((sum / eventRatings.length) * 100) / 100).toString();
}

/**
 * Implement to complete Task 3
 *
 * The objective of the third task is to get the name of the group of users that rated the event
 * lowest. The function should take an event, a list of all ratings, and a list of all users and
 * return a group name.
 *
 * If an event has no ratings the function should return null.
 * If an event has no groups the function should return null.
 * If two groups have the same low rating, return the first group by alpha numeric name
 *
 *
 *
 * It's expected that this task will take the bulk of your time, but it is not a disqualification
 * if you do not complete this challenge in the allotted time. We are also assessing your ability
 * to explain problems, solicit feedback, and pair program. Part of that assessment involves you
 * asking for help when you need it.
 *
 * @param {Object} event
 * @param {Object[]} ratings
 * @param {Object[]} users
 *
 * @returns {mixed} Null if no ratings/groups or the lowest rated group name for an event
 */
export function lowestRatedGroupForEvent(event, ratings, users) {
  const groupRatings = {};
  // Get ratings for this specific event
  const eventRatings = ratings.filter(function(rating) {
      return rating.eventId === event.id;
  });
  // If there are no ratings for this event, return null
  if (eventRatings.length === 0) {
      return null;
  }

  // Reduce the number of users to check by only looking at those who have rated the event
  let usersToCheck = [];
  eventRatings.forEach(function(rating) {
      const user = users.find(function(user) {
          return user.id === rating.userId;
      });
      if (user != null) {
          usersToCheck.push(user);
      }
  });
  // Create a dictionary of group names with user ratings
  usersToCheck.forEach(function(user) {
      const userRatings = eventRatings.filter(function(rating) {
          return rating.userId === user.id;
      });
      user.groups.forEach(function(group) {
          if (groupRatings[group] == null) {
              groupRatings[group] = userRatings;
          } else {
              groupRatings[group] = groupRatings[group].concat(userRatings);
          }
      });
  });
  // If there are no groups for this event, return null
  if (Object.keys(groupRatings).length == 0) {
      return null;
  }
  // Determine which group has the lowest average rating
  let lowestGroup = null;
  let lowestRating = Infinity;
  for (const [group, groupRatingValues] of Object.entries(groupRatings)) {
      let sum = 0;
      for (let rating of groupRatingValues) {
          sum += rating.rating;
      }
      const avgRating = (Math.ceil((sum / groupRatingValues.length) * 100) / 100);
      if (avgRating < lowestRating) {
          lowestRating = avgRating;
          lowestGroup = group;
      } else if (avgRating === lowestRating && group < lowestGroup) {
          lowestGroup = group;
      }
  }
  return lowestGroup;
}
