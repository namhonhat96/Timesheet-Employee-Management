import React from "react";
import axios from "axios";
import "./Timesheet.css";

export default class Timesheet extends React.Component {
  state = {
    userId: "",
    weekEnding: "",
    weekFormat: "",
    billing: 40,
    compensated: 40,
    comment: "",
    days: [{
      startTime: "",
      endTime: "",
      totalHours: 0,
      floating: false,
      vacation: false,
      holiday: false,
    }], 
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
        console.log(
          "user id = " + timesheet.userId + "; week: " + timesheet.weekEnding
        );
        this.setState({
          userId: timesheet.userId,
          weekEnding: timesheet.weekEnding,
          billing: timesheet.totalBillingHour,
          compensated: timesheet.totalCompensatedHour,
          days: timesheet.days,
        });
        console.log("this state " + this.state.weekEnding);
      });
    let dateFormat = new Date(weekEnding);
    console.log(dateFormat);
    this.setState({
      weekFormat:
        dateFormat.getFullYear() +
        "-" +
        (dateFormat.getMonth()+1) +
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

  handleCheckboxChange =(event)=> {
    this.setState({days: event.target.value })
  }

  handleSave = (event)=> {
    event.preventDefault();

    const newTimesheet = {
      userId : this.state.userId,
      weekEnding : this.state.weekEnding,
      totalBillingHour : this.state.billing,
      totalCompensatedHour : this.state.compensated,
      comment : this.state.comment,
      days : this.state.days,
    }
    axios
      .put('http://localhost:8084/timesheet/updateTimesheet', newTimesheet)
      .then((res)=>{});
    
      // window.location = "/timesheet"
  }

  handleDefault = (event) =>{
    event.preventDefault();

    const newTemplate ={
      userId: this.state.userId,
      days : this.state.days,
    }

    axios
      .put('http://localhost:8084/timesheet/updateTemplate', newTemplate)
      .then((res)=>{});
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
                <th><input 
                      name = "floating"
                      type = "checkbox"
                      checked = {item.floating}
                      onChange ={this.handleCheckboxChange}/></th>
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
