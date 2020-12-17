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

  handleSave() {}

  handleDefault() {}

  chooseFloatingDay(choseDate) {
    //check Floating Days left
    //URL: "localhost:8084/timesheet/pto"
    //if null, create a new PTO document. Otherwise update the pto value for that year
    //update the pto left
  }

  chooseVacationDay(chosenDate) {
    //Check Vacation Days left
    //if null, create a new PTO document. Otherwise update the vacation pto value for that year
  }

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
                <td>{item.day}</td>
                <td>{item.date}</td>
                <td>{item.startTime}</td>
                <td>{item.endTime}</td>
                <td>{item.totalHours}</td>
                <td>
                  {item.floating ? (
                    "x"
                  ) : item.holiday ? (
                    " "
                  ) : (
                    <button
                      onClick={() => this.chooseFloatingDay(item.floating)}
                    >
                      Select
                    </button>
                  )}
                </td>
                <td>{item.holiday ? "x" : ""}</td>
                <td>
                  {" "}
                  {item.vacation ? (
                    "x"
                  ) : item.holiday ? (
                    " "
                  ) : (
                    <button
                      onClick={() => this.chooseFloatingDay(item.vacation)}
                    >
                      Select
                    </button>
                  )}
                </td>
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
