import PenZ from "@/core/PenZ";
// import React from "react";
// import PenZDOM from "../runtime/jsx-runtime";
// import ReactDom from "react-dom";

import PenZDOM from "@/core/PenZDom";

class RenderText extends PenZ.Component {
  constructor() {
    super();
    this.a = "ShowPen";
    this.state = {
      count: 0,
    };
  }

  handleClick1 = (event) => {
    // console.log(event, "parent");
    // console.log(event.currentTarget,'---parentEvent')
    // console.log(event.target,'---parentEvent')

    console.log("handleParentClick");
  };

  handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // console.log(event, "childEvent");
    // console.log(event.currentTarget,'---childEvent')
    // console.log(event.target,'---childEvent')

    console.log("handleChildClick");
  };

  render() {
    const { count } = this.state;

    return (
      <div>
        <img
          style={{ width: "300px", height: "300px" }}
          src="https://showpenz.github.io/images/avatar.jpg"
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

function Title(props) {
  return <div>{props.title}</div>;
}

// let element = <Title title="123" />;

PenZDOM.render(<RenderText />, document.getElementById("root"));
