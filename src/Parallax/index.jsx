import React, { Component } from "react";

class Parallax extends Component {
  constructor() {
    super();

    this.state = {
      parallaxSpeed: {
        x: 100,
        y: 75
      },
      parallaxBackgroundStyle: {
        left: 0,
        top: 0
      }
    };
  }

  handleParallaxEffect = event => {
    const wrapperOffset = this.wrapper.getBoundingClientRect();

    let outerCenterX = wrapperOffset.left + wrapperOffset.width / 2,
      outerCenterY = wrapperOffset.top + wrapperOffset.height / 2,
      distanceX = event.pageX - outerCenterX,
      distanceY = event.pageY - outerCenterY,
      direction = Math.atan2(distanceY, distanceX),
      distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)),
      distanceEqualized =
        distance /
        Math.sqrt(
          Math.pow(window.innerWidth / 2, 2) +
            Math.pow(window.innerHeight / 2, 2)
        );

    let xMoved = Math.cos(direction) * this.state.parallaxSpeed.x * distanceEqualized,
      yMoved = Math.sin(direction) * this.state.parallaxSpeed.y * distanceEqualized;

    this.setState({ parallaxBackgroundStyle: { left: xMoved, top: yMoved } });
  };

  render() {
    return (
      <div
        className="wrapper"
        ref={wrapper => {
          this.wrapper = wrapper;
        }}
      >
        <div
          className="background"
          style={this.state.parallaxBackgroundStyle}
          onMouseMove={this.handleParallaxEffect}
          ref={background => {
            this.background = background;
          }}
        />
      </div>
    );
  }
}

export default Parallax;
