import React from "react";
import axios from "axios";
import "./Timesheet.css";

export default class Timesheet extends React.Component {
  state = {
    // useriD: "",
    weekEnding: "",
    billing: 40,
    compensated: 0,
    comment: "",
    days: [],
  };

  componentDidMount() {
    let uid = 1;
    let weekEnding = "12/26/2020"; //localstorage.getitem("we'e'ken'ding")
    //retrieve data from backend
    axios.get('http://localhost:8084/timesheet/week?userId='+uid+"&weekEnding="+weekEnding)
          .then(
            res=>{
              const timesheet = res.data;
              console.log("user id = "+timesheet.userId+"; week: "+ timesheet.weekEnding);
              this.setState({
                weekEnding: timesheet.weekEnding,
                billing: timesheet.totalBillingHour,
                compensated: timesheet.totalCompensatedHour,
                days: timesheet.days,
              });
              console.log("this state " + this.state.weekEnding);
            }
          )
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
            value={this.state.weekEnding}
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
            {this.state.days.map((item,index) =>(
              <tr key={index}>
                <th>{item.day}</th>
                <th>{item.date}</th>
                <th>{item.startTime}</th>
                <th>{item.endTime}</th> 
                <th>{item.totalHours}</th>
                <th>{item.floating ? 'x' : ''}</th>
                <th>{item.holiday ? 'x' : ''}</th>
                <th>{item.vacation ? 'x' : ''}</th>
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
