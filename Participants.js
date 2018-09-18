import React, { Component } from "react";
import { View, ListItem, Text, List } from "native-base";

export default class Participants extends React.Component {
  render() {
    return (
      <View>
        <ListItem itemDivider>
          <Text>{this.props.label}</Text>
        </ListItem>
        {Object.keys(this.props.items)
          .reverse()
          .map(i => {
            let item = this.props.items[i];
            return (
              <List key={i}>
                <ListItem>
                  <Text>{item.name}</Text>
                </ListItem>
              </List>
            );
          })}
      </View>
    );
  }
}
