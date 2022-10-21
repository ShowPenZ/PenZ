import PenZ from "./core/PenZ";
import PenZDOM from "./core/PenZDom";

class Counter extends PenZ.Component {
  render() {
    return <div>123</div>
  }
}

PenZDOM.render(<Counter />, document.getElementById("root"));
