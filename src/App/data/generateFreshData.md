# Generate Fresh Data

This is strictly for helping to generate new data. There is no need to modify this file or any other files in this directory

## Event Names
Currently 57 unique events pulled from DB

## GroupNames
Currently 40 unique groups pulled from DB

## Ratings
Easiest to open lodash docs and paste this in.
```js
const getNewRatings = () => (
  _.times(
    1200,
    () => ({
      eventId: `event-${Math.floor(Math.random() * 58)}`,
      userId: `user-${Math.floor(Math.random() * 400)}`,
      rating: Math.floor(Math.random() * 6)
    })
  )
);
copy(getNewRatings())
```

## Users
Easiest to open lodash docs and paste this in with userName and groupName already pasted in
```js
const getUsers = _.times(400, index => ({ id: `user-${index}`, first: userNames[index].split(' ')[0], last: userNames[index].split(' ')[1], username: (userNames[index].split(' ')[0] + userNames[index].split(' ')[1]).toLowerCase(), groups: _.uniq(_.times(Math.floor(Math.random() * 5) + 1, () => groupNames[Math.floor(Math.random() * groupNames.length)])) }));

copy(getUsers());
```
