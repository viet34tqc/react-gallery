import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./gallery.css";

class SlideShow extends Component {
  constructor(props) {
    super(props);
    const ratioWHArray = this.props.ratio.split(":");
    this.ratioWH = ratioWHArray[0] / ratioWHArray[1];
    this.numberOfSlide = this.props.images.length;
  }
  state = {
    activeIndex: 0
  };

  getActiveIndex = step => {
    const newActiveIndex = this.state.activeIndex + step;
    if (newActiveIndex > this.numberOfSlide - 1) {
      return 0;
    } else if (newActiveIndex < 0) {
      return this.numberOfSlide - 1;
    }
    return newActiveIndex;
  };

  updateDimension = () => {
    this.container.style.height = `${this.container.offsetWidth /
      this.ratioWH}px`;
    this.navImage.style.height = `${this.navImage.offsetWidth /
      this.numberOfSlide /
      this.ratioWH}px`;
  };

  setImageNavWidth = () => {
    const imagesNav = this.navImage.querySelectorAll(".nav__image");
    imagesNav.forEach(image => {
      image.style.width = `${100 / this.numberOfSlide}%`;
    });
  };

  handleRunAutomatic = () => {
    if (this.props.mode !== "auto") return;
    const timeout = this.props.timeout || 1000;
    this.automaticInterval = setInterval(this.next, Number.parseInt(timeout));
  };

  componentWillMount() {
    window.removeEventListener("resize", this.updateDimensions);
    if (this.automaticInterval) clearInterval(this.automaticInterval);
  }

  componentDidMount = () => {
    this.rootELem = ReactDOM.findDOMNode(this);
    this.container = this.rootELem.querySelector(".container");
    this.navImage = this.rootELem.querySelector(".image-nav");
    this.setImageNavWidth();
    window.addEventListener("resize", this.updateDimension);

    this.handleRunAutomatic();
  };

  setActiveIndex = activeIndex => {
    this.setState({ ...this.state, activeIndex });
  };

  next = () => {
    const activeIndex = this.getActiveIndex(1);
    this.setActiveIndex(activeIndex);
  };

  back = () => {
    const activeIndex = this.getActiveIndex(-1);
    this.setActiveIndex(activeIndex);
  };

  getActiveClass = index => {
    return this.state.activeIndex === index ? "active" : "";
  };

  renderSlide = (image, index) => {
    return (
      <div key={index} className={`slide ${this.getActiveClass(index)}`}>
        <div className="slide__number">
          {`${index + 1} / ${this.props.images.length}`}
        </div>
        <img className="slide__image" src={image.src} alt={image.caption} />
        <div className="slide__caption">{image.caption}</div>
      </div>
    );
  };

  renderImageNav = (image, index) => {
    return (
      <img
        key={index}
        className={`nav__image ${this.getActiveClass(index)}`}
        src={image.src}
        alt={image.caption}
        onClick={() => this.setActiveIndex(index)}
      />
    );
  };

  render() {
    return (
      <div className="slideshow">
        <div className="container">
          {this.props.images.map(this.renderSlide)}
          <span className="prev" onClick={this.back}>
            ❮
          </span>
          <span className="next" onClick={this.next}>
            ❯
          </span>
        </div>
        <div className="image-nav">
          {this.props.images.map(this.renderImageNav)}
        </div>
      </div>
    );
  }
}
export default SlideShow;
