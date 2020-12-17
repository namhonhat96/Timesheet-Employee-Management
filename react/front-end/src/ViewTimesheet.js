import React from "react";
import axios from "axios";

export default class ViewTimesheet extends React.Component {
  state = {
    weekEnding: "",
    totalBillingHour: "",
    totalCompensatedHour: "",
    days: [],
  };

  componentDidMount() {
    let uid = 1;
    let weekEnding = localStorage.getItem("weekEnding");
    axios
      .get(`http://localhost:8084/timesheet/week`, id, weekEnding)
      .then((res) => {
        const testExample = res.data;
        this.setState({
          weekEnding: testExample.weekEnding,
          totalBillingHour: testExample.totalBillingHour,
          totalCompensatedHour: testExample.totalCompensatedHour,
          days: testExample.days,
        });
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
            value={this.state.weekEnding}
          ></input>

          <label for="billing">Total Billing Hours:</label>
          <input
            type="text"
            id="billing"
            name="billing"
            className="narrow-font set-width"
            value={this.state.totalBillingHour}
            onChange={this.handleChange1}
          ></input>
          <br />
          <label for="compensate">Total Compensated Hours:</label>
          <input
            type="text"
            id="compensate"
            name="compensate"
            className="narrow-font set-width"
            value={this.state.totalCompensatedHour}
            onChange={this.handleChange2}
          ></input>
        </div>
        <br />
        <div>
          <table>
            <thead>
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
            </thead>
            <tbody>
              {this.state.days.map((dayDetail) => (
                <tr key={dayDetail.id}>
                  <td>{dayDetail.day}</td>
                  <td>{dayDetail.date}</td>
                  <td>{dayDetail.startTime}</td>
                  <td>{dayDetail.endTime}</td>
                  <td>{dayDetail.totalHours}</td>
                  <td>{dayDetail.floating ? "X" : ""}</td>
                  <td>{dayDetail.vacation ? "X" : ""}</td>
                  <td>{dayDetail.holiday ? "X" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
