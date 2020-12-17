import React from "react";
import axios from "axios";
import "./Timesheet.css";

export default class Timesheet extends React.Component {
  state = {
    // useriD: "",
    weekEnding: "",
    weekFormat: "",
    billing: "",
    compensated: "",
    comment: "",
    days: [],
    dateFormat: "",
  };

  componentDidMount() {
    let uid = localStorage.getItem("userID");
    let weekEnding = localStorage.getItem("weekEnding");
    //retrieve data from backend
    axios
      .get(
        "http://localhost:8084/timesheet/week?userId=" +
          uid +
          "&weekEnding=" +
          weekEnding
      )
      .then((res) => {
        const timesheet = res.data;
        this.setState({
          weekEnding: timesheet.weekEnding,
          billing: timesheet.totalBillingHour,
          compensated: timesheet.totalCompensatedHour,
          days: timesheet.days,
        });
      });
    let dateFormat = new Date(weekEnding);
    this.setState({
      weekFormat:
        dateFormat.getFullYear() +
        "-" +
        (dateFormat.getMonth() + 1) +
        "-" +
        dateFormat.getDate(),
    });
  }

  handleChange1 = (event) => {
    //Calculate base on the working hours
    this.setState({ billing: event.target.value });
  };

  handleChange2 = (event) => {
    //Calculate based on the total hours (working hour + floating day / vacation)
    this.setState({ compensated: event.target.value });
  };

  handleChange3 = (event) => {
    //Calculate based on the total hours (working hour + floating day / vacation)
    let currentWeek = this.state.weekEnding;
    let value = event.target.value;
    if (currentWeek != value) {
      let newDate = new Date(value);
      this.setState({
        weekEnding:
          newDate.getMonth() +
          1 +
          "/" +
          (newDate.getDate() + 1) +
          "/" +
          newDate.getFullYear(),
      });

      let dateFormat = new Date(this.state.weekEnding);
      this.setState({
        weekFormat:
          dateFormat.getFullYear() +
          "-" +
          (dateFormat.getMonth() + 1) +
          "-" +
          dateFormat.getDate(),
      });
      console.log(this.state.weekEnding);
      localStorage.setItem("weekEnding", this.state.weekEnding);
      console.log(localStorage.getItem("weekEnding"));
      //window.location = "/timesheet";
    }
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
            value={this.state.weekFormat}
            onChange={this.handleChange3}
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
            {this.state.days.map((item, index) => (
              <tr key={index}>
                <th>{item.day}</th>
                <th>{item.date}</th>
                <th>{item.startTime}</th>
                <th>{item.endTime}</th>
                <th>{item.totalHours}</th>
                <th>{item.floating ? "x" : ""}</th>
                <th>{item.holiday ? "x" : ""}</th>
                <th>{item.vacation ? "x" : ""}</th>
              </tr>
            ))}
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
