import React, { Component } from "react";

class Courses extends Component {
  state = {
    courses: [],
    message: null,
  };

  componentDidMount() {
    fetch("/courses", {
      headers: {
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.setState({ courses: response.courses }))
      .catch((error) => this.setState({ message: error.message }));
  }

  render() {
    return (
      <>
        {this.state.message && <p>{this.state.message}</p>}
        <ul>
          {this.state.courses.map((course) => {
            return <li key={course.id}>{course.title}</li>;
          })}
        </ul>
      </>
    );
  }
}

export default Courses;
