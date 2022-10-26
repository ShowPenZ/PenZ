import PenZ from "@/core/PenZ";
// import React from "react";
// import PenZDOM from "../runtime/jsx-runtime";
// import ReactDom from "react-dom";

import PenZDOM from "@/core/PenZDom";

class RenderText extends PenZ.Component {
  constructor() {
    super();
    this.a = "ShowPen";
    this.state = { number: 0, title: "计数器" };
  }

  handleClick1 = (event) => {
    console.log("handleParentClick");
  };

  handleClick = (event) => {
    event.stopPropagation();
    this.setState({ number: this.state.number + 1 });
    console.log(this.state);
    this.setState({ number: this.state.number + 1 });
    console.log(this.state);
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 });
      console.log(this.state);
      this.setState({ number: this.state.number + 1 });
      console.log(this.state);
    });

    console.log("handleChildClick");
  };

  render() {
    const { count } = this.state;

    return (
      <div>
        <img
          style={{ width: "300px", height: "300px" }}
          src="https://showpenz.github.io/images/avatar.jpg"
          alt=""
        />
        <div onClick={this.handleClick1}>
          <span>{count}</span>
          <button
            style={{ marginLeft: "20px" }}
            type="button"
            onClick={this.handleClick}
          >
            +
          </button>
          {/* <h2>{count}</h2> */}
        </div>
      </div>
    );
  }
}


PenZDOM.render(<RenderText />, document.getElementById("root"));
