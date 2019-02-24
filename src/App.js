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
  render() {
    return (
      <div className="App">
        <h1>Gallery</h1>
        <SlideShow images={images} />
      </div>
    );
  }
}

export default App;
