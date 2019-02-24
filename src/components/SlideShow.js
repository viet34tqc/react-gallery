import React, { Component } from "react";
import "./gallery.css";

class SlideShow extends Component {
  state = {
    activeIndex: 0
  };

  getActiveIndex = step => {
    const numberOfSlide = this.props.images.length;
    const newActiveIndex = this.state.activeIndex + step;
    if (newActiveIndex > numberOfSlide - 1) {
      return 0;
    } else if (newActiveIndex < 0) {
      return numberOfSlide - 1;
    }
    return newActiveIndex;
  };

  setImageNavWidth = () => {
    const numberOfSlide = this.props.images.length;
    const imagesNav = document.querySelectorAll(".nav__image");
    imagesNav.forEach(image => {
      image.style.width = `${100 / numberOfSlide}%`;
    });
  };

  componentDidMount = () => {
    this.setImageNavWidth();
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
        className="nav__image"
        src={image.src}
        alt={image.caption}
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
          <div className="image-nav">
            {this.props.images.map(this.renderImageNav)}
          </div>
        </div>
      </div>
    );
  }
}
export default SlideShow;
