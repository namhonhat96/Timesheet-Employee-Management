import React from "react";
import axios from "axios";

export default class Summary extends React.Component {
  //Define the variable names from backend pojo

  //create a table to display result 

  //componentdidmount
  constructor(props) {
    super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { //state is by default an object
       summarys: [],
  
       count: 5
    }
 }
//  state = { WeekEnding: "", hours: "", submissionStatus: "", approvalStatus:"", option:"", comment:"" };

 renderTableData() {
      return this.state.summarys.map((student, index) => {
         const { id, weekEnding, hours, submissionStatus, approvalStatus,option,  comment} = student
         return (
            <tr key={id}>
               <td>{weekEnding}</td>
               <td>{hours}</td>
               <td>{submissionStatus}</td>
               <td>{approvalStatus}</td>
               <td onClick={this.handleOption()}>{option}</td>
               <td>{comment}</td>

            </tr>
         )
      })
   }

handleOption(){
  //if completed, jump to viewtimesheet page
  //set the wekendEnding to localStorage.
  //window.location = "/timesheet/view";

  //if incompleted not started, jump to timehsheet page
    //set the wekendEnding to localStorage.
  //window.location = "/timesheet;
 }

  componentDidMount() {
 
    this.state.userId = localStorage.getItem("userID");
    console.log(this.userId+"-------")
    axios.get(`http://localhost:8084/timesheet/summary?userId=`+this.state.userId).then((res) => {
      this.setState ({summarys : res.data});
    });
    
  }

  handleShowMore() {

    this.setState ({
      count: this.state.summarys.length
    });
  }


  render() {
    const count = this.count;
    return (
      <div>
      <table>
        <tr>
          <th>WeekEnding</th>
          <th>Total Hours</th>
          <th>Submission Status</th>
          <th>Approval Status</th>
          <th>Option</th>
          <th>Comment</th>
        </tr>
        <tr></tr>
        <tbody>
          {this.renderTableData()}
        </tbody>
      </table>
      
      <button
      type="button"
      className="button-time"
      button-time
      onClick={this.handleShowMore}
    >
      Show More
    </button>
    </div>


    );
  }
}
