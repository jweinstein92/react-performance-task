import {
  averageRatingForEvent,
  filterEvents,
  lowestRatedGroupForEvent,
} from './tasks';

describe('Task 1', () => {
  it('should filter events by the search text', () => {
    const searchText = 'blended learning';
    const expected = [
      { id: 'event-1', name: 'blended learning training' },
      { id: 'event-2', name: 'blended learning session' },
    ];
    const otherEvents = [
      { id: 'event-3', name: 'coaching session' },
    ];

    const allEvents = expected.concat(otherEvents);

    expect(filterEvents(allEvents, searchText)).toEqual(expected);
  });

  it('should filter events insensitive to case of event name', () => {
    const searchText = 'blended learning';
    const expected = [
      { id: 'event-1', name: 'BLENDED LEARNING TRAINING' },
      { id: 'event-2', name: 'Blended Learning Session' },
    ];
    const otherEvents = [
      { id: 'event-3', name: 'coaching session' },
    ];

    const allEvents = expected.concat(otherEvents);

    expect(filterEvents(allEvents, searchText)).toEqual(expected);
  });

  it('should filter events insensitive to case of search text', () => {
    const searchText = 'BlEnDeD LeArnIng';
    const expected = [
      { id: 'event-1', name: 'BLENDED LEARNING TRAINING' },
      { id: 'event-2', name: 'Blended Learning Session' },
    ];
    const otherEvents = [
      { id: 'event-3', name: 'coaching session' },
    ];

    const allEvents = expected.concat(otherEvents);

    expect(filterEvents(allEvents, searchText)).toEqual(expected);
  });

  it('should not filter the list if no search text is provided', () => {
    const searchText = '';
    const allEvents = [
      { id: 'event-1', name: 'BLENDED LEARNING TRAINING' },
      { id: 'event-2', name: 'Blended Learning Session' },
      { id: 'event-3', name: 'coaching session' },
    ];

    expect(filterEvents(allEvents, searchText)).toEqual(allEvents);
  });

  it('should not mutate the source list of events', () => {
    const searchText = 'blended learning';
    const expected = [
      { id: 'event-1', name: 'blended learning training' },
      { id: 'event-2', name: 'blended learning session' },
    ];
    const otherEvents = [
      { id: 'event-3', name: 'coaching session' },
    ];

    const allEvents = expected.concat(otherEvents);

    const result = filterEvents(allEvents, searchText);
    expect(result).not.toBe(allEvents);
    expect(allEvents).toEqual(expected.concat(otherEvents));
  });
});

describe('Task 2', () => {
  it('should return the average rating of the event', () => {
    const event = { 'id': 'event-1', name: 'Blended Learning Training' };
    const ratings = [
      { eventId: 'event-1', rating: 1, userId: 'user-1',},
      { eventId: 'event-1', rating: 3, userId: 'user-2',},
      { eventId: 'event-1', rating: 4, userId: 'user-3',},
      { eventId: 'event-2', rating: 5, userId: 'user-3',},
    ];

    expect(averageRatingForEvent(event, ratings)).toEqual("2.67");
  });

  it('should return null if there are no ratings for an event', () => {
    const event = { 'id': 'event-1', name: 'Blended Learning Training' };
    const ratings = [
      { eventId: 'event-2', rating: 1, userId: 'user-1' },
      { eventId: 'event-2', rating: 3, userId: 'user-2' },
      { eventId: 'event-2', rating: 4, userId: 'user-3' },
    ];

    expect(averageRatingForEvent(event, ratings)).toEqual(null);
  });
});
describe('Task 3', () => {
  it('should return null if there are no ratings for an event', () => {
    const event = { 'id': 'event-1', name: 'Blended Learning Training' };
    const ratings = [
      { eventId: 'event-2', rating: 1, userId: 'user-1' },
      { eventId: 'event-2', rating: 3, userId: 'user-2' },
      { eventId: 'event-2', rating: 4, userId: 'user-3' },
    ];

    expect(averageRatingForEvent(event, ratings, [])).toEqual(null);
  });
  it('should return null if there are no group ratings for an event', () => {
    const event = { 'id': 'event-1', name: 'Blended Learning Training' };
    const ratings = [
      { eventId: 'event-2', rating: 1, userId: 'user-1' },
      { eventId: 'event-2', rating: 3, userId: 'user-2' },
      { eventId: 'event-2', rating: 4, userId: 'user-3' },
    ];
    const FIRST_GROUP = 'FIRST_GROUP';
    const SECOND_GROUP = 'SECOND_GROUP';
    const users = [
      { groups: [FIRST_GROUP], id: 'user-1' },
      { groups: [SECOND_GROUP], id: 'user-2' },
      { groups: [FIRST_GROUP], id: 'user-3' },
    ];
    expect(averageRatingForEvent(event, ratings, users)).toEqual(null);
  });
  it('should return return the group name with the lowest rating', () => {
    const event = { 'id': 'event-1', name: 'Blended Learning Training' };
    const ratings = [
      { eventId: 'event-1', rating: 1, userId: 'user-1' },
      { eventId: 'event-1', rating: 3, userId: 'user-2' },
      { eventId: 'event-1', rating: 4, userId: 'user-3' },
      { eventId: 'event-2', rating: 5, userId: 'user-3' },
    ];
    const LOWEST = 'LOWEST';
    const FIRST_GROUP = 'FIRST_GROUP';
    const SECOND_GROUP = 'SECOND_GROUP';
    const users = [
      { groups: [FIRST_GROUP, LOWEST], id: 'user-1' },
      { groups: [SECOND_GROUP], id: 'user-2' },
      { groups: [FIRST_GROUP], id: 'user-3' },
      { groups: [FIRST_GROUP, SECOND_GROUP], id: 'user-4' },
    ];

    expect(lowestRatedGroupForEvent(event, ratings, users)).toEqual(LOWEST);
  });
  it('should return return the first alpha numeric group name if multiple groups have the same rating', () => {
    const event = { 'id': 'event-1', name: 'Blended Learning Training' };
    const ratings = [
      { eventId: 'event-1', rating: 1, userId: 'user-1' },
      { eventId: 'event-1', rating: 3, userId: 'user-2' },
      { eventId: 'event-1', rating: 5, userId: 'user-3' },
      { eventId: 'event-2', rating: 5, userId: 'user-3' },
    ];
    const GROUP_WITH_Z = 'zGROUP_WITH_Z';
    const GROUP_WITH_A = 'aGROUP_WITH_A';
    const users = [
      { groups: [GROUP_WITH_Z], id: 'user-1' },
      { groups: [GROUP_WITH_A], id: 'user-2' },
      { groups: [GROUP_WITH_Z], id: 'user-3' },
    ];

    expect(lowestRatedGroupForEvent(event, ratings, users)).toEqual(GROUP_WITH_A);
  });
});
