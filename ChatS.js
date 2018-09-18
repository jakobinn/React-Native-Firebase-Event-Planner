import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { Item, Input, Container, Content, Icon } from "native-base";
import firebase from "firebase";
import Header from "./Header";
let styles = require("./Styles");

export default class ChatS extends Component {
  constructor(props) {
    super(props);

    messages = [];
    let eventNameUsed = this.removeSpaces(this.props.route.passProps.eventName);
    this.state = {
      eventName: this.props.route.passProps.eventName || "NoEvent",
      eventNameUsed: eventNameUsed || "NoEvent",
      text: "",
      name: this.props.route.passProps.user || "Jakob",
      messages: [],
      isReady: false
    };
    this.onBackPress = this.onBackPress.bind(this);
  }

  removeSpaces(theStr) {
    let str = theStr[0].replace(/\s/g, "");
    return str;
  }

  componentWillUnmount() {
    let chatRef = firebase.database().ref("chats/");
    chatRef.child(this.state.eventNameUsed).off();
  }

  getMessages() {
    let _messages = [];
    let chatRef = firebase
      .database()
      .ref("chats/" + this.state.eventNameUsed + "/");

    chatRef.on("child_added", child => {
      let item = child.val();
      let name = item.name;
      let message = item.text;
      let childKey = child.key;
      _messages.push(
        <View key={childKey} style={styles.message}>
          <Text style={styles.messageName}>{name}</Text>
          <Text>{message}</Text>
        </View>
      );
    });

    return _messages;
  }

  getFirebaseRef() {
    return firebase.database().ref("chats/" + this.state.eventNameUsed + "/");
  }

  componentDidMount() {
    let chatRef = this.getFirebaseRef();
    let _messages = [];
    this.removeSpaces(this.state.eventNameUsed);
    this.getMessages();
  }

  onSend() {
    let messagesNew = this.state.messages.push({
      name: this.state.name,
      message: this.state.text
    });
    this.setState({ text: "" });
    this.input._root.clear();
    let chatRef = this.getFirebaseRef();
    chatRef.push({
      name: this.state.name,
      text: this.state.text
    });
  }

  onBackPress() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.containFlex}>
        <Header
          name={this.props.route.passProps.eventName}
          onBackPress={this.onBackPress}
        />
        <ScrollView style={styles.messageContainer}>
          {this.getMessages()}
        </ScrollView>
        <Container>
          <Content>
            <Item style={styles.messageInput}>
              <Input
                ref={ref => {
                  this.input = ref;
                }}
                onChangeText={text => {
                  this.setState({ text: text });
                }}
              />
              <Icon
                onPress={() => this.onSend()}
                style={styles.messageSendIcon}
                active
                name="md-arrow-dropright"
              />
            </Item>
          </Content>
        </Container>
      </View>
    );
  }
}
