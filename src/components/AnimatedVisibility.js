import React from "react";
import { Animated } from "react-animated-css";
import Container from 'react-bootstrap/Container';


class AnimatedVisibility extends React.Component {
  render() {
    return (
      <Animated
        animationInDuration={400}
        animationOutDuration={400}
        isVisible={this.props.isVisible}
        animateOnMount={this.props.animateOnMount || false}
        className='step'
      >
        <Container>
          {this.props.children}
        </Container>
      </Animated>
    );
  }
}

export default AnimatedVisibility;