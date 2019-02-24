import React, { Component } from "react";
import "./App.css";
import SlideShow from "./components/SlideShow";
import img1 from "./images/01.jpg";
import img2 from "./images/02.jpg";
import img3 from "./images/03.jpg";
import img4 from "./images/04.jpg";

const images = [
  { src: img1, caption: "Caption 1" },
  { src: img2, caption: "Caption 2" },
  { src: img3, caption: "Caption 3" },
  { src: img4, caption: "Caption 4" }
];

class App extends Component {
  state = {
    mode: "normal"
  };

  handleChange = () => {
    this.setState({
      ...this.state,
      mode: this.state.mode === "auto" ? "normal" : "auto"
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Gallery</h1>
        <label htmlFor="automatic-slide">Automatic</label>
        <input
          type="checkbox"
          name=""
          id="automatic-slide"
          onChange={this.handleChange}
        />
        <SlideShow
          key={this.state.mode}
          mode={this.state.mode}
          images={images}
          ratio={`3:2`}
        />
      </div>
    );
  }
}

export default App;
