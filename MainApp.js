import React, { Component } from "react";
import { Tabs, Container, Header, Tab } from "native-base";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import ListItem from "./ListItem";
import firebase from "firebase";
let parseString = require("react-native-xml2js").parseString;
let moment = require("moment");
let styles = require("./Styles");

export default class MainApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabOne: true,
      data: null,
      user: "Bobi",
      id: 5
    };
  }

  fetchData() {
    let date = moment(new Date()).format("YYYY-MM-DD");
    let FETCH_URL = `http://data.southampton.ac.uk/dumps/events-diary/${date}/events-diary.rss`;
    fetch(FETCH_URL)
      .then(response => response.text())
      .then(responseData => {
        parseString(responseData, (err, results) => {
          if (results === undefined) {
            this.setState({ data: null });
            return;
          } else {
            this.setState({
              data: results.rss.channel[0].item
            });
          }
        });
      })
      .done();
  }

  eventList() {
    let events = [];
    for (let i = 0; i < this.state.data.length; i++) {
      events.push(
        <ListItem
          id={this.state.id}
          navigator={this.props.navigator}
          key={i}
          user={this.state.user}
          name={this.state.data[i].title}
          description={this.state.data[i].description}
          link={this.state.data[i].link}
          date={this.state.data[i].pubDate}
        />
      );
    }
    return events;
  }

  displayEventList() {
    return this.state.data === null ? (
      <Text style={styles.notFoundText}>No events found</Text>
    ) : (
      this.eventList()
    );
  }

  componentWillMount() {
    // Initialize Firebase
    var config = {
      apiKey: "SENSITIVE_DATA",
      authDomain: "SENSITIVE_DATA",
      databaseURL: "SENSITIVE_DATA",
      projectId: "SENSITIVE_DATA",
      storageBucket: "SENSITIVE_DATA",
      messagingSenderId: "SENSITIVE_DATA"
    };
    firebase.initializeApp(config);
    this.fetchData();
  }

  render() {
    return (
      <Container>
        <Header hasTabs />
        <Tabs initialPage={0}>
          <Tab heading="Events">
            <ScrollView>{this.displayEventList()}</ScrollView>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
