import * as React from "react";

class Poef extends React.Component {
  state = {
    firstName: "Louis",
    lastName: "Lastname"
  };

  doeIets = () => {
    this.setState({ lastName: "newName" });
  };

  render() {
    const { firstName, lastName } = this.state;
    return (
      <div>
        <div>{firstName}</div>
        <div>{lastName}</div>
        <button onClick={this.doeIets}>Change state</button>
      </div>
    );
  }
}

export default Poef;
