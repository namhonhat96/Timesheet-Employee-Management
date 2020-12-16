import React from "react";
import axios from "axios";

export default class Summary extends React.Component {
  //Define the variable names from backend pojo

  //create a table to display result 

  //componentdidmount
  constructor(props) {
    super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { //state is by default an object
       summarys: [
          { WeekEnding: '2020-12-26', hours: '40', submissionStatus: 'Not Started', approvalStatus: 'N/A', option: 'Edit', comment: '' },
          { WeekEnding: '2020-12-25', hours: '32', submissionStatus: 'Incomplete', approvalStatus: 'Not approved', option: 'Edit', comment: 'A' },
          { WeekEnding: '2020-12-24', hours: '40', submissionStatus: 'Complete', approvalStatus: 'approved', option: 'View', comment: 'B' }, 

       ],
  
       count: 5
    }
 }
//  state = { WeekEnding: "", hours: "", submissionStatus: "", approvalStatus:"", option:"", comment:"" };

 renderTableData() {
      return this.state.summarys.map((student, index) => {
         const { WeekEnding, hours, submissionStatus, approvalStatus,option,  comment} = student
         return (
            <tr key={WeekEnding}>
               <td>{WeekEnding}</td>
               <td>{hours}</td>
               <td>{submissionStatus}</td>
               <td>{approvalStatus}</td>
               <td onClick={this.handleOption()}>{option}</td>
               <td>{comment}</td>

            </tr>
         )
      })
   }

handleOption(){ }

  componentDidMount() {
 

    let userId = localStorage.getItem("userID");
    axios.get(`http://localhost:8084/summary/` + userId).then((res) => {
      
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
