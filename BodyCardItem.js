import React, { Component } from "react";
import { Button, Text, Right, Left, CardItem, Icon } from "native-base";
let styles = require("./Styles");

export default class BodyCardItem extends React.Component {
  constructor(props) {
    super(props);
  }

  chatPress() {
    this.props.navigator.push({
      name: "chat",
      passProps: {
        user: this.props.user,
        eventName: this.props.name
      }
    });
  }

  render() {
    return (
      <CardItem>
        <Left>
          <Button onPress={() => this.chatPress()} transparent>
            <Icon active name="chatbubbles" />
            <Text>Chat</Text>
          </Button>
        </Left>
        <Right>
          <Text style={styles.date}>{this.props.date}</Text>
        </Right>
      </CardItem>
    );
  }
}
