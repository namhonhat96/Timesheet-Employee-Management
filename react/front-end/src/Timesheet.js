import React from "react";
import axios from "axios";
import "./Timesheet.css";

export default class Timesheet extends React.Component {
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
    let uid = localStorage.getItem("userID");
    let weekEnding = "12/26/2020";

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

  handleChange1 = (event) => {
    //Calculate base on the working hours
    this.setState({ billing: event.target.value });
  };

  handleChange2 = (event) => {
    //Calculate based on the total hours (working hour + floating day / vacation)
    this.setState({ compensated: event.target.value });
  };

  handleCheckboxChange = (event) => {
    this.setState({ days: event.target.value });
  };

  handleSave = (event) => {
    event.preventDefault();

    const newTimesheet = {
      userId: this.state.userId,
      weekEnding: this.state.weekEnding,
      totalBillingHour: this.state.billing,
      totalCompensatedHour: this.state.compensated,
      comment: this.state.comment,
      days: this.state.days,
    };
    axios
      .put("http://localhost:8084/timesheet/updateTimesheet", newTimesheet)
      .then((res) => {});

    // window.location = "/timesheet"
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

  handleDefault = (event) => {
    event.preventDefault();

    const newTemplate = {
      userId: this.state.userId,
      days: this.state.days,
    };

    axios
      .put("http://localhost:8084/timesheet/updateTemplate", newTemplate)
      .then((res) => {});
  };

  handleItem = (index, value) => {
    let days = this.state.days;
    days[index].startTime = value;
    this.setState({
      days: days,
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
                {/* <th>{item.startTime}</th> */}

                <th>
                  <select name="startTime" defaultValue={item.startTime}>
                    <option value="N/A">N/A</option>
                    <option value="1:00">1:00</option>
                    <option value="2:00">2:00</option>
                    <option value="3:00">3:00</option>
                    <option value="4:00">4:00</option>
                    <option value="5:00">5:00</option>
                    <option value="6:00">6:00</option>
                    <option value="7:00">7:00</option>
                    <option value="8:00">8:00</option>
                    <option value="9:00">9:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option>
                    <option value="22:00">22:00</option>
                    <option value="23:00">23:00</option>
                    <option value="24:00">24:00</option>
                  </select>
                </th>
                <th>
                  <select name="endTime" defaultValue={item.endTime}>
                    <option value="N/A">N/A</option>
                    <option value="1:00">1:00</option>
                    <option value="2:00">2:00</option>
                    <option value="3:00">3:00</option>
                    <option value="4:00">4:00</option>
                    <option value="5:00">5:00</option>
                    <option value="6:00">6:00</option>
                    <option value="7:00">7:00</option>
                    <option value="8:00">8:00</option>
                    <option value="9:00">9:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option>
                    <option value="22:00">22:00</option>
                    <option value="23:00">23:00</option>
                    <option value="24:00">24:00</option>
                  </select>
                </th>

                <th>
                  <select name="totalHours" defaultValue={item.totalHours}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                  </select>
                </th>
                {/* <th>{item.endTime}</th> */}
                {/* <th>{item.totalHours}</th> */}
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
