import React from "react";
import styled from "styled-components";
// import console from "console";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    name: state.name
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: name =>
      dispatch({
        type: "UPDATE_NAME",
        name
      })
  };
}

class Avatar extends React.Component {
  state = {
    photo: "https://cl.ly/57a404bd7e2d/download/avatar-default.jpg"
  };

  componentDidMount() {
    fetch("https://uifaces.co/api?random&limit=1&gender[]=female", {
      headers: new Headers({
        "X-API-KEY": "8a56d25122c40a4009d9a27f5da8f7"
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          photo: res[0].photo
        });
        this.props.updateName(res[0].name);
      });
  }

  render() {
    return <Image source={{ uri: this.state.photo }} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
