import React, { Component } from "react";
import {
  Button,
  Text,
  Body,
  View,
  Card,
  CardItem,
  Container
} from "native-base";
import NavigationExperimental from "react-native-deprecated-custom-components";
import firebase from "firebase";
let styles = require("./Styles");
import Header from "./Header";
import Participants from "./Participants";
import { ScrollView } from "react-native";

export default class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      going: ["None"],
      notGoing: ["None"]
    };
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentWillMount() {
    this.populateLists("going");
    this.populateLists("notGoing");
  }

  removeSpaces(theStr) {
    let str = theStr[0].replace(/\s/g, "");
    return str;
  }

  populateLists(status) {
    let eventName = this.removeSpaces(this.props.route.passProps.name);
    let ref = firebase.database().ref(`events/${eventName}/${status}/`);
    ref.on("value", (snap, key) => {
      this.setState({ [status]: snap.val() });
    });
  }

  onActionButtonPressed(status) {
    let eventName = this.removeSpaces(this.props.route.passProps.name);
    let ref = firebase.database().ref(`events/${eventName}/${status}/`);
    ref.push({
      name: this.props.route.passProps.user
    });
  }

  getParticipants(participants) {
    return !participants || participants.length === 0 ? ["None"] : participants;
  }

  onBackPress() {
    this.props.navigator.pop();
  }

  render() {
    let notGoingItems = this.getParticipants(this.state.notGoing);
    let goingItems = this.getParticipants(this.state.going);

    return (
      <Container>
        <Header
          name={this.props.route.passProps.name}
          onBackPress={this.onBackPress}
        />
        <ScrollView>
          <CardItem>
            <Body>
              <Text>{this.props.route.passProps.description}</Text>
            </Body>
          </CardItem>
          <Text style={styles.link}>{this.props.route.passProps.link}</Text>
          <View style={styles.buttonGroup}>
            <Button onPress={() => this.onActionButtonPressed("going")} primary>
              <Text> Going </Text>
            </Button>
            <Button
              onPress={() => this.onActionButtonPressed("notGoing")}
              danger
            >
              <Text> Not Going </Text>
            </Button>
          </View>
          <View style={styles.participants}>
            <Participants label="Going" items={goingItems} />
            <Participants label="Not Going" items={notGoingItems} />
          </View>
        </ScrollView>
      </Container>
    );
  }
}
