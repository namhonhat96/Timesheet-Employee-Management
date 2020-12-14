import React from "react";
import axios from "axios";
import "./profile.css";

export default class Profile extends React.Component {
  state = {
    phoneNumber: "",
    email: "",
    eContactName1: "",
    eContactPhone1: "",
    eContactName2: "",
    eContactPhone2: "",
    homeAddress: "",
    addressId: "",
    eContactId: "",
  };

  componentDidMount() {
    axios.get(`http://localhost:8085/contact/1`).then((res) => {
      const testExample = res.data;
      this.setState({
        phoneNumber: testExample.phoneNumber,
        email: testExample.email,
        addressId: testExample.addressId,
        eContactId: testExample.eContactId,
      });
    });

    axios.get(`http://localhost:8085/address/1`).then((res) => {
      const testExample2 = res.data;
      this.setState({
        homeAddress: testExample2.homeAddress,
      });
    });

    axios.get(`http://localhost:8085/econtact/1`).then((res) => {
      const testExample3 = res.data;
      this.setState({
        eContactName1: testExample3.name1,
        eContactPhone1: testExample3.phoneNumber1,
        eContactName2: testExample3.name2,
        eContactPhone2: testExample3.phoneNumber2,
      });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const testContact = {
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
    };

    const testAddress = {
      id: this.state.addressId,
      homeAddress: this.state.homeAddress,
    };

    const testEContact = {
      id: this.state.eContactId,
      eContactName1: this.state.eContactName1,
      eContactPhone1: this.state.eContactPhone1,
      eContactName2: this.state.eContactName2,
      eContactPhone2: this.state.eContactPhone2,
    };

    axios
      .post(`http://localhost:8085/contact/update`, testContact)
      .then((res) => {});

    axios
      .post(`http://localhost:8085/address/update`, testAddress)
      .then((res) => {});

    axios
      .post(`http://localhost:8085/econtact/update`, testEContact)
      .then((res) => {});

    window.location = "/profile";
  };

  handleChange1 = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };
  handleChange2 = (event) => {
    this.setState({ email: event.target.value });
  };
  handleChange3 = (event) => {
    this.setState({ homeAddress: event.target.value });
  };

  handleChange4 = (event) => {
    this.setState({ eContactName1: event.target.value });
  };

  handleChange5 = (event) => {
    this.setState({ eContactPhone1: event.target.value });
  };

  handleChange6 = (event) => {
    this.setState({ eContactName2: event.target.value });
  };

  handleChange7 = (event) => {
    this.setState({ eContactPhone2: event.target.value });
  };
  render() {
    return (
      <div>
        <br />
        <h1>Contact Form</h1>
        <form onSubmit={this.handleSubmit}>
          <h3>Contact</h3>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            onChange={this.handleChange1}
            value={this.state.phoneNumber}
            placeholder="(917) 328 - 7765"
          />
          <br />

          <input
            type="text"
            id="email"
            name="email"
            onChange={this.handleChange2}
            value={this.state.email}
            placeholder="EamilID@gmail.com"
          />
          <br />
          <input
            type="text"
            id="homeAddress"
            name="homeAddress"
            onChange={this.handleChange3}
            value={this.state.homeAddress}
            placeholder="(Home Address) 200 Sayte Drive, Princeton, New Jersey 08648 "
          />
          <br />

          <h3>Emergency Contact 1</h3>
          <input
            type="text"
            id="eContactName1"
            name="eContactName1"
            onChange={this.handleChange4}
            value={this.state.eContactName1}
            placeholder="First Name, Last Name"
          />
          <br />

          <input
            type="text"
            id="eContactPhone1"
            name="eContactPhone1"
            onChange={this.handleChange5}
            value={this.state.eContactPhone1}
            placeholder="(917) 328 - 7765"
          />
          <br />

          <h3>Emergency Contact 2</h3>
          <input
            type="text"
            id="eContactName2"
            name="eContactName2"
            onChange={this.handleChange6}
            value={this.state.eContactName2}
            placeholder="(917) 328 - 7765"
          />
          <br />

          <input
            type="text"
            id="eContactPhone2"
            name="eContactPhone2"
            onChange={this.handleChange7}
            value={this.state.eContactPhone2}
            placeholder="(917) 328 - 7765"
          />
          <br />

          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}
