import React, { Component } from "react";
import { Button, Text, Body, CardItem } from "native-base";
let styles = require("./Styles");

export default class HeaderCardItem extends React.Component {
  constructor(props) {
    super(props);
    this.eventPress = this.eventPress.bind(this);
  }

  eventPress() {
    this.props.navigator.push({
      name: "item",
      passProps: {
        id: this.props.id,
        user: this.props.user,
        name: this.props.name,
        description: this.props.description,
        link: this.props.link,
        date: this.props.date
      }
    });
  }

  render() {
    return (
      <CardItem>
        <Body>
          <Text>{this.props.name}</Text>
        </Body>
        <Button onPress={() => this.eventPress()} light>
          <Text> View </Text>
        </Button>
      </CardItem>
    );
  }
}
