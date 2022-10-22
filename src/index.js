import PenZ from "@/core/PenZ";
// import PenZDOM from "../runtime/jsx-runtime";

import PenZDOM from "@/core/PenZDom";

class RenderText extends PenZ.Component {
  constructor() {
    super();
    this.a = "ShowPen";
    this.state = {
      count: 0,
    };
  }

  handleClick = () => {
    const { count } = this.state;
    this.setState({ count: 1 + count });
  };

  render() {
    const { count } = this.state;
    console.log(count);
    
    return (
      <div>
        <img
          style={{ width: "300px", height: "300px" }}
          src="https://showpenz.github.io/images/avatar.jpg"
        />
        <div>
          <span>{count}</span>
          <input
            style={{ marginLeft: "20px" }}
            type="button"
            onClick={this.handleClick}
            value="+"
          />
        </div>
        {/* <h2>{count}</h2> */}
      </div>
    );
  }
}

function Title(props) {
  return <div>{props.title}</div>;
}

// let element = <Title title="123" />;

PenZDOM.render(<RenderText />, document.getElementById("root"));
