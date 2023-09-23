//=========PenZ==========

import PenZ from "./core/PenZ";
import PenZDOM from "./core/PenZDom";

class Counter extends PenZ.Component {
  constructor(props) {
    super(props);
  }

  handClick = (params) => {
    console.log("hello,world");
  };

  render() {
    return (
      <div>
        <button onClick={this.handClick}>add</button>
        <p>12123</p>
        <h2>1231fwew</h2>
      </div>
    );
  }
}

PenZDOM.render(<Counter />, document.getElementById("root"));
