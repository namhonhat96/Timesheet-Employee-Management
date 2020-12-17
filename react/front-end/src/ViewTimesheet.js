import React from "react";
import axios from "axios";

export default class ViewTimesheet extends React.Component {
  state = {
    userId: "",
    weekEnding: "",
    weekFormat: "",
    billing: "",
    compensated: "",
    comment: "",
    days: [],
    dateFormat: "",
  };

  componentDidMount() {
    let uid = 1;
    let weekEnding = localStorage.getItem("weekEnding");
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
          userId: timesheet.userId,
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

  convertFormatedtoNormal(inputDay) {
    let formatDate = new Date(inputDay);
    return (
      formatDate.getMonth() +
      1 +
      "/" +
      (formatDate.getDate() + 1) +
      "/" +
      formatDate.getFullYear()
    );
  }

  handleChange3 = (event) => {
    //Calculate based on the total hours (working hour + floating day / vacation)
    let changedWeek = this.convertFormatedtoNormal(event.target.value);
    let dateFormat = new Date(changedWeek);
    this.setState({
      weekEnding: changedWeek,
      weekFormat:
        dateFormat.getFullYear() +
        "-" +
        (dateFormat.getMonth() + 1) +
        "-" +
        dateFormat.getDate(),
    });
    localStorage.setItem("weekEnding", changedWeek);
    let uid = localStorage.getItem("userID");
    axios
      .get(
        "http://localhost:8084/timesheet/week?userId=" +
          uid +
          "&weekEnding=" +
          changedWeek
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
  };

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
          ></input>
          <br />
          <label for="compensate">Total Compensated Hours:</label>
          <input
            type="text"
            id="compensate"
            name="compensate"
            className="narrow-font set-width"
            value={this.state.compensated}
          ></input>
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
      </div>
    );
  }
}
