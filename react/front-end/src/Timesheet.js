import React from "react";
import axios from "axios";
import "./Timesheet.css";

export default class Timesheet extends React.Component {
  state = {
    dateStart: "",
    dateEnd: "",
    billing: "",
    compensated: "",
    daysOfWeek: [],
    dates: [],
  };

  componentDidMount() {
    //retrieve data from backend
    this.setState({
      dateStart: "2020-12-20",
      dateEnd: "2020-12-26",
      billing: "32",
      compensated: "40",
      daysOfWeek: [
        "Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday",
      ],
      //List of days of the week for the table
    });
    // To calculate the time difference of two dates
    var d1 = new Date(this.state.dateStart);
    var d2 = new Date(this.state.dateEnd);
    const timeDiff = d2.getTime() - d1.getTime();

    // To calculate the no. of days between two dates
    let days = timeDiff / (1000 * 3600 * 24);

    //to list the days
    while (days !== 0) {
      let date = new Date(d2);
      date.setDate(date.getDate() - days);
      this.state.dates.push(date);
      days--;
    }
    // console.log(this.state.dates);
  }

  handleChange1 = (event) => {
    //Calculate base on the working hours
    this.setState({ billing: event.target.value });
  };

  handleChange2 = (event) => {
    //Calculate based on the total hours (working hour + floating day / vacation)
    this.setState({ compensated: event.target.value });
  };

  handleSave() {}

  handleDefault() {}

  render() {
    return (
      <div>
        <div>
          <label for="week">Week Ending:</label>
          <input
            type="date"
            id="start"
            name="trip-start"
            className="narrow-font set-width"
            value={this.state.dateEnd}
          ></input>

          <label for="billing">Total Billing Hours:</label>
          <input
            type="text"
            id="billing"
            name="billing"
            className="narrow-font set-width"
            value={this.state.billing}
            onChange={this.handleChange1}
          ></input>
          <br />
          <label for="compensate">Total Compensated Hours:</label>
          <input
            type="text"
            id="compensate"
            name="compensate"
            className="narrow-font set-width"
            value={this.state.compensated}
            onChange={this.handleChange2}
          ></input>
        </div>
        <div>
          <button
            type="button"
            className="button-time"
            button-time
            onClick={this.handleDefault}
          >
            Set Default
          </button>
        </div>
        <br />
        <div>
          <table>
            <tr>
              <th>Day</th>
              <th>Date</th>
              <th>Starting Time</th>
              <th>Ending Time</th>
              <th>Total Hours</th>
              <th>Floating Day</th>
              <th>Holiday</th>
              <th>Vacation</th>
            </tr>
            <tr></tr>
          </table>
        </div>
        <div>
          <select id="timesheet-select">
            <option value="">--Please choose an option--</option>
            <option value="approved">Approved Timesheet</option>
            <option value="unapproved">Unapproved Timesheet</option>
          </select>

          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
          ></input>
          <button
            type="button"
            className="button-time"
            onClick={this.handleSave}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}
