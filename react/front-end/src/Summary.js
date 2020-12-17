import React from "react";
import axios from "axios";

export default class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summarys: [],
    };
  }

  renderTableData() {
    return this.state.summarys.map((summary, index) => {
      const {
        id,
        weekEnding,
        totalBillingHour,
        submissionStatus,
        approvalStatus,
        comment,
      } = summary;
      let option =
        submissionStatus === "Completed" ? (
          <a href="/view" onClick={this.handleOption(summary)}>
            {" "}
            View
          </a>
        ) : "Incompleted" ? (
          <a href="/timesheet" onClick={this.handleOption(summary)}>
            {" "}
            Edit
          </a>
        ) : (
          <a href="/timesheet" onClick={this.handleOption(summary)}>
            {" "}
            Start
          </a>
        );
      return (
        <tr key={id}>
          <td>{weekEnding}</td>
          <td>{totalBillingHour}</td>
          <td>{submissionStatus}</td>
          <td>{approvalStatus}</td>
          <td>{option}</td>
          <td>{comment}</td>
        </tr>
      );
    });
  }

  handleOption = (summary) => (event) => {
    console.log(summary.weekEnding);
    localStorage.setItem("userId", 1);
    localStorage.setItem("weekEnding", summary.weekEnding);
  };

  componentDidMount() {
    let userId = localStorage.getItem("userID");
    this.userId = 1;
    axios
      .get(`http://localhost:8084/timesheet/summary?userId=` + this.userId)
      .then((res) => {
        this.setState({ summarys: res.data });
      });
  }

  handleShowMore() {
    this.setState({
      count: this.state.summarys.length,
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
          <tbody>{this.renderTableData()}</tbody>
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
