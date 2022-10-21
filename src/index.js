import PenZ from "./core/PenZ";
import PenZDOM from "./core/PenZDom";

class RenderText extends PenZ.Component {
  constructor() {
    super();
    this.a = 'ShowPen';
  }

  render() {
    const { a } = this;
    return (
      <div>
        <img
          style={{ width: "300px", height: "300px" }}
          src="https://showpenz.github.io/images/avatar.jpg"
        />
        <h2>{a}</h2>
      </div>
    );
  }
}

// function Title(props) {
//   return PenZ.createElement(
//     "div",
//     null,
//     PenZ.createElement("img", {
//       className: "title",
//       style: {
//         width:'300px',
//         height:'300px'
//       },
//       src: "https://showpenz.github.io/images/avatar.jpg",
//     }),
//     <div>9998</div>
//   );
// }

PenZDOM.render(<RenderText />, document.getElementById("root"));
