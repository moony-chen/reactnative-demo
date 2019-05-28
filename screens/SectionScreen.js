import React from "react";
import styled from "styled-components";
import {
  TouchableOpacity,
  StatusBar,
  WebView,
  Linking,
  ScrollView
} from "react-native";
import { Icon } from "expo";
import Markdown from "react-native-showdown";

class SectionScreen extends React.Component {
  static navigationOptions = {
    title: "Section",
    header: null
  };

  componentDidMount() {
    StatusBar.setBarStyle("light-content", true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle("dark-content", true);
  }

  render() {
    const { navigation } = this.props;
    const section = navigation.getParam("section");
    return (
      <ScrollView>
        <Container>
          <StatusBar hidden />
          <Cover>
            <Image source={section.image} />
            <Wapper>
              <Logo source={section.logo} />
              <Subtitle>{section.subtitle}</Subtitle>
            </Wapper>
            <Title>{section.title}</Title>
            <Caption>{section.caption}</Caption>
          </Cover>
          <TouchableOpacity
            style={{ position: "absolute", top: 20, right: 20 }}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <CloseView>
              <Icon.Ionicons
                name="ios-close"
                size={36}
                color="#4775f2"
                style={{ marginTop: -2 }}
              />
            </CloseView>
          </TouchableOpacity>
          <Content>
            {/* <WebView
            source={{ html: section.content + htmlStyle }}
            scalesPageToFit={false}
            scrollEnabled={false}
            ref="webview"
            onNavigationStateChange={event => {
              console.log(event);
              if (event.url != "about:blank") {
                this.refs.webview.stopLoading();
                Linking.openURL(event.url);
              }
            }}
          /> */}
            <Markdown
              body={section.content}
              pureCSS={htmlStyle}
              scalesPageToFit={false}
              scrollEnabled={false}
            />
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

export default SectionScreen;

const html = `
 <h2>This is a title</h2>
 <p> this <strong>is</strong> a <a href="http://google.com">link</a></p>
 <img src="https://cl.ly/e087109c9d5e/download/background6.jpg" />
`;

const htmlStyle = `
    * {
        font-family: -apple-system, Roboto;
        margin: 0;
        padding: 0;
        font-size: 17px;
        font-weight: normal;
        color: #3c4560;
        line-height: 24px;
    }

    h2 {
        font-size: 20px;
        text-tranform: uppercase;
        color: #b8bece;
        font-weight: 600;
        margin-top: 50px;
    }

    p {
        margin-top: 20px;
    }

    a {
        color: #4775f2;
        font-weight: 600;
        text-decoration: none;
    }

    strong {
        font-weight: 700;
    }

    img {
        width: 100%;
        border-radius: 10px;
        margin-top: 20px;
    }

    pre {
        padding: 20px;
        background: #212c4f;
        overflow: hidden;
        word-wrap: break-word;
        border-radius: 10px;
        margin-top: 20px;
    }

    code {
        color: white;
    }
`;

const Content = styled.View`
  height: 1000px;
  padding: 20px;
`;

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;
const Caption = styled.Text`
  font-size: 17px;
  color: white;
  width: 300px;
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Wapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;
