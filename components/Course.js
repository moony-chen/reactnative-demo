import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

function getCourseWidth(screenWidth) {
  let cardWidth = screenWidth - 40;
  if (screenWidth >= 768) {
    cardWidth = (screenWidth - 60) / 2;
  }
  if (screenWidth >= 1024) {
    cardWidth = (screenWidth - 80) / 3;
  }
  return cardWidth;
}

class Course extends React.Component {
  state = {
    cardWidth: getCourseWidth(screenWidth)
  };
  componentDidMount() {
    Dimensions.addEventListener("change", this.adaptLayout);
  }

  adaptLayout = dimensions => {
    this.setState({
      cardWidth: getCourseWidth(dimensions.window.width)
    });
  };

  render() {
    return (
      <Container style={{ width: this.state.cardWidth }}>
        <Cover>
          <BackgroundImage source={this.props.backgroundImage} />
          <Logo source={this.props.logo} />
          <Caption>{this.props.caption}</Caption>
          <Title>{this.props.title}</Title>
        </Cover>
        <Quote>
          <Avatar source={this.props.avatar} />
          <Wapper>
            <Subtitle>{this.props.subtitle}</Subtitle>
            <Taught>Taught by {this.props.tutor}</Taught>
          </Wapper>
        </Quote>
      </Container>
    );
  }
}

export default Course;

const Container = styled.View`
  background: white;
  height: 335px;
  width: 335px;
  border-radius: 14px;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const Cover = styled.View`
  width: 100%;
  height: 260px;
`;
const BackgroundImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const Logo = styled.Image`
  width: 48px;
  height: 48px;
  align-self: center;
  margin-top: 30px;
  margin-bottom: 74px;
`;
const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  margin-left: 20px;
  border-radius: 16px;
`;
const Caption = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  margin-left: 20px;
  font-size: 15px;
  font-weight: 500;
`;
const Title = styled.Text`
  font-size: 24px;
  width: 170px;
  margin-left: 20px;
  margin-top: 10px;
  color: white;
  font-weight: 600;
`;
const Subtitle = styled.Text`
  color: #3c4560;
  font-size: 14px;
  font-weight: 500;
`;
const Taught = styled.Text`
  color: #b8bece;
  font-size: 13px;
  font-weight: 500;
`;
const Quote = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: 75px;
`;
const Wapper = styled.View`
  margin-left: 20px;
  margin-right: 40px;
`;
