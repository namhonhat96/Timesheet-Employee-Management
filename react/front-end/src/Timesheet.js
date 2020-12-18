import React from "react";
import axios from "axios";
import "./Timesheet.css";

export default class Timesheet extends React.Component {
  state = {
    userId: "",
    weekEnding: "",
    weekFormat: "",
    submissionStatus: "",
    approvalStatus: "",
    billing: "",
    compensated: "",
    comment: "",
    days: [],

    dateFormat: "",
    startTime: [],
    floatingCount: 0,
    vacationCount: 0,
    year: 0,
    // weekFloat: 0,
    // weekVacation:0,
  };

  componentDidMount() {
    let uid = localStorage.getItem("userID");
    let weekEnding = localStorage.getItem("weekEnding");
    console.log("weekEnding" + weekEnding);
    let yr = weekEnding.split(/[/]/)[2];
    // retrieve pto data from backend 
    axios
    .get('http://localhost:8084/timesheet/pto?userId=' +
          uid +
          "&year=" +
          yr)
    .then((res)=>{
          const pto = res.data;
          console.log("pto: ");
          console.log(pto);
          this.setState({
            year: pto.year,
            floatingCount: pto.floatingCount,
            vacationCount: pto.vacationCount,
          })
    })
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
        console.log(res.data);
        this.setState({
          userId: timesheet.userId,
          weekEnding: timesheet.weekEnding,
          submissionStatus: timesheet.submissionStatus,
          approvalStatus: timesheet.approvalStatus,
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



  handleSave = (event) => {
    event.preventDefault();

    const newTimesheet = {
      userId: this.state.userId,
      weekEnding: this.state.weekEnding,
      submissionStatus: this.state.submissionStatus,
      approvalStatus: this.state.approvalStatus,
      totalBillingHour: this.state.billing,
      totalCompensatedHour: this.state.compensated,
      comment: this.state.comment,
      days: this.state.days,
    };
    const newPTO ={
      userId: this.state.userId,
      year: this.state.year,
      floatingCount: this.state.floatingCount,
      vacationCount: this.state.vacationCount,
    }
    axios
      .put("http://localhost:8084/timesheet/updateTimesheet", newTimesheet)
      .then((res) => {});
    axios
    .put("http://localhost:8084/timesheet/update-pto", newPTO)
    .then((res) => {});
    window.location = "/summary";
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

  handleDefault = (event) => {
    event.preventDefault();

    const newTemplate = {
      userId: this.state.userId,
      days: this.state.days,
    };

    axios
      .put("http://localhost:8084/timesheet/updateDefault", newTemplate)
      .then((res) => {});
  };

  handleChangeTime = (index) => (event) => {
    let newDays = this.state.days;
    console.log(event.target.name);
    let name = event.target.name;
    var newStartTime;
    var newEndTime;
    if (name === 'startTime'){
      newDays[index].startTime = event.target.value;
      newStartTime = this.timeStringToFloat(newDays[index].startTime);
      newEndTime =  this.timeStringToFloat(this.state.days[index].endTime);
    }
    else if(name ==='endTime'){
      newDays[index].endTime = event.target.value;
      newEndTime = this.timeStringToFloat(newDays[index].endTime);
      newStartTime =  this.timeStringToFloat(this.state.days[index].startTime);
    }
    
    console.log("start: "+newStartTime);
    console.log(newEndTime);
    newDays[index].totalHours = newEndTime - newStartTime;
    let newBilling =  this.calculateTotalBilling(newDays);  
    let diff = newBilling - this.state.billing;
    let newCompensated = this.state.compensated + diff;

    this.setState({
      days: newDays,
      billing: newBilling,
      compensated: newCompensated

    });
  };


  handleCheckboxChange = (index) => (event) => {
    let newDays = this.state.days;
    let name = event.target.name;
    let floatNum = this.state.floatingCount;
    let vacationNum = this.state.vacationCount;
    let requireF = 0;
    let requireV = 0;

    console.log(event.target.name);
    var newCompensated = this.state.compensated;
    if(name === 'vacation'){
      newDays[index].vacation= this.state.days[index].vacation ? false:true;
      if(newDays[index].vacation) {
        vacationNum -= 1;
        let originalTotalHour = newDays[index].totalHours;
        newDays[index].totalHours = 0.0;
        newDays[index].startTime = "N/A";
        newDays[index].endTime = "N/A";    
        newCompensated += 8 - originalTotalHour;
      }
      else{
        vacationNum += 1;
        newDays[index].startTime = "9:00";
        newDays[index].endTime = "18:00";
        newDays[index].totalHours = this.calculateDailyWorkTime(index);
      }

    }
    if(name === 'floating'){
      newDays[index].floating = this.state.days[index].floating ? false:true;
      if(newDays[index].floating) {
        floatNum -= 1;
        let originalTotalHour = newDays[index].totalHours;
        newDays[index].totalHours = 0.0;
        newDays[index].startTime = "N/A";
        newDays[index].endTime = "N/A";
        newCompensated += 8 - originalTotalHour;
      }
      else{
        floatNum += 1;
        newDays[index].startTime = "9:00";
        newDays[index].endTime = "18:00";
        newDays[index].totalHours = this.calculateDailyWorkTime(index);
        console.log("compensated" + this.state.compensated);

      }
      console.log(newDays[index].floating);
    }
    let newBilling =  this.calculateTotalBilling(newDays);
    if(newDays[index].holiday) {
      newCompensated += 8;
    }

    for(let i = 0 ; i < newDays.length; i++)
    {
      if(newDays[i].floating === true){
        requireF ++;
      }
      if(newDays[i].vacation === true){
        requireV ++;
      }
    }
    let newComment = "";
    if(requireF > 0){
      newComment = requireF +" floating required; ";
    }
    if(requireV > 0 ){
      newComment = newComment + requireV + " vacation day required;";
    }

    this.setState({
      billing: newBilling,
      compensated: newCompensated,
      days: newDays,
      floatingCount: floatNum,
      vacationCount: vacationNum,
      comment: newComment,
      // weekFloat: requireF,
      // weekVacation: requireV,
    });
  };

  // Helper function
  timeStringToFloat(time) {
    var hoursMinutes = time.split(/[:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1]?parseInt(hoursMinutes[1], 10) : 0;
    return hours+minutes/60;
  }

  calculateDailyWorkTime(index){
    let start = this.state.days[index].startTime;
    let end = this.state.days[index].endTime;
    if (start ==='N/A' || end ==='N/A'){
      return 0.0;
    }
    return this.timeStringToFloat(end) - this.timeStringToFloat(start);
  }
  calculateTotalBilling (days){
    let billingHours = 0;
    for(let i=0;i<days.length;i++){
      billingHours += days[i].totalHours;
    }
    console.log("sum is: "+ billingHours);
    return billingHours;
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
                <th>{item.day}</th>
                <th>{item.date}</th>
                <th>

                  <select
                    name="startTime"
                    value={item.startTime}
                    onChange={this.handleChangeTime(index)}
                  >
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

                  <select name="endTime" 
                  value={item.endTime}
                  onChange={this.handleChangeTime(index)}>
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

                <th>{item.totalHours}</th>
                <th>
                    {item.holiday ? (
                      " "
                    ) :  (
                      item.vacation ?
                      " "
                      : <input 
                      name = "floating"
                      type = "checkbox"
                      checked = {item.floating}
                      onChange = {this.handleCheckboxChange(index)}>
                      </input>
                    )
                    }                    
                 </th>
                <th>{item.holiday ? "x" : ""}</th>

                <th>
                    {item.holiday ? (
                      " "
                    ) :  (
                      item.floating ?
                      " "
                      : <input 
                      name = "vacation"
                      type = "checkbox"
                      checked = {item.vacation}
                      onChange = {this.handleCheckboxChange(index)}>
                      </input>
                    )
                    }   

                </th>
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
            hidden = {this.state.vacationCount <0 || this.state.floatingCount<0}
          >
            Save
          </button>
        </div>
      </div>

    );
  }
}