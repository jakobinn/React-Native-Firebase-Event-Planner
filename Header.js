import React, { Component } from "react";
import { Header, Left, Button, Icon, Right, Body, Title } from "native-base";
let styles = require("./Styles");

export default class App extends React.Component {
  onBack() {
    this.props.onBackPress();
  }

  render() {
    return (
      <Header>
        <Left>
          <Button
            onPress={() => {
              this.onBack();
            }}
            transparent
          >
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.name}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
