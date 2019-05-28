import React from "react";
import styled from "styled-components";
import { Button } from "react-native";
import Project from "../components/Project";
import { PanResponder, Animated } from "react-native";

class ProjectsScreen extends React.Component {
  static navigationOptions = {
    title: "Projects",
    header: null
  };

  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44),
    scale3rd: new Animated.Value(0.8),
    translateY3rd: new Animated.Value(50),
    index: 0
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Animated.spring(this.state.scale, { toValue: 1 }).start();
        Animated.spring(this.state.translateY, { toValue: 0 }).start();

        Animated.spring(this.state.scale3rd, { toValue: 0.9 }).start();
        Animated.spring(this.state.translateY3rd, { toValue: 44 }).start();
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: () => {
        const positionY = this.state.pan.y.__getValue();
        // console.log(positionY);
        if (positionY > 200) {
          Animated.timing(this.state.pan, {
            toValue: { x: 0, y: 1000 }
          }).start(() => {
            this.state.pan.setValue({ x: 0, y: 0 });
            this.state.scale.setValue(0.9);
            this.state.scale3rd.setValue(0.8);
            this.state.translateY.setValue(44);
            this.state.translateY3rd.setValue(-50);
            this.setState({ index: (this.state.index + 1) % 3 });
          });
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 }
          }).start();
          Animated.spring(this.state.scale, { toValue: 0.9 }).start();
          Animated.spring(this.state.translateY, { toValue: 44 }).start();
          Animated.spring(this.state.scale3rd, { toValue: 0.8 }).start();
          Animated.spring(this.state.translateY, { toValue: -50 }).start();
        }
      }
    });
  }

  render() {
    return (
      <Container>
        <Animated.View
          style={{
            transform: [
              { translateX: this.state.pan.x },
              { translateY: this.state.pan.y }
            ]
          }}
          {...this._panResponder.panHandlers}
        >
          <Project {...projects[this.state.index]} />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY }
            ]
          }}
        >
          <Project {...projects[(this.state.index + 1) % 3]} />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -3,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              { scale: this.state.scale3rd },
              { translateY: this.state.translateY3rd }
            ]
          }}
        >
          <Project {...projects[(this.state.index + 2) % 3]} />
        </Animated.View>
      </Container>
    );
  }
}

export default ProjectsScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`;

const Text = styled.Text``;

const projects = [
  {
    title: "Price Tag",
    image: require("../assets/background5.jpg"),
    author: "Liu Yi",
    text: "Enumerating objects: 18, done."
  },
  {
    title: "The DM App - Ananoumous Chat",
    image: require("../assets/background6.jpg"),
    author: "Chad Goodman",
    text: "Writing objects: 100% (10/10), 2.63 KiB | 2.63 MiB/s, done."
  },
  {
    title: "Ohsjdfi",
    image: require("../assets/background7.jpg"),
    author: "ajfaj kjdfk",
    text: `To github.com:moony-chen/reactnative-demo.git
        d1dea16..3d3232d  master -> master`
  }
];
