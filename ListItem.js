import React, { Component } from "react";
import { Card } from "native-base";
import BodyCardItem from "./BodyCardItem";
import HeaderCardItem from "./HeaderCardItem";
let styles = require("./Styles");

export default class ListItem extends React.Component {
  render() {
    return (
      <Card>
        <HeaderCardItem
          user={this.props.user}
          id={this.props.id}
          description={this.props.description}
          link={this.props.link}
          date={this.props.date}
          name={this.props.name}
          navigator={this.props.navigator}
        />
        <BodyCardItem
          user={this.props.user}
          name={this.props.name}
          date={this.props.date}
          navigator={this.props.navigator}
        />
      </Card>
    );
  }
}
