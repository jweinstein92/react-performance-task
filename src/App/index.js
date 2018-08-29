import React, { Component } from 'react';

import dataEvents from './data/events';
import dataRatings from './data/ratings';
import dataUsers from './data/users';

import {
  averageRatingForEvent,
  filterEvents,
  lowestRatedGroupForEvent,
} from '../tasks';

class AppSync extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: dataEvents,
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    const { value } = e.target;

    if (value !== '') {
      this.setState(({ events }) => ({ events: filterEvents(dataEvents, value) }));
    } else {
      this.setState(({ events }) => ({ events: dataEvents }));
    }
  }

  render() {
    const { events } = this.state;

    return (
      <div className="AppSync container">
        <div className="row">
          <div className="page-header">
            <h1>Performance Task</h1>
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="search">Search by event name: <small><i>(Task 1)</i></small> </label>
            <input className="form-control" id="search" name="search" onChange={this.handleSearch} type="text"  />
          </div>
        </div>
        <div className="row">
          <h3>Event Data</h3>
            {(events || []).length ? (
              <table>
                <thead>
                  <tr>
                    <th>Name of Event</th>
                    <th>Average User Rating <small><i>(Task 2)</i></small></th>
                    <th>Lowest Rated Group <small><i>(Task 3)</i></small></th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={`event-${event.name}`}>
                      <td>{event.name}</td>
                      <td>{averageRatingForEvent(event, dataRatings)}</td>
                      <td>{lowestRatedGroupForEvent(event, dataRatings, dataUsers)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="alert alert-danger">There is no data matching your query</div>
            )}
          </div>
      </div>
    );
  }
}

export default AppSync;
