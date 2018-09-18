'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
} from 'react-native';

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

module.exports = {
  notFoundText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  message: {
  	marginTop: 8, 
  	width: deviceWidth/1.2,
  },
  messageName: {
  	fontWeight: 'bold',
  },
  date: {
  	fontSize: 12,
  },
  containFlex: {
	 flex: 2
  },
  messageContainer: {
  	height: deviceHeight/2.2, 
  	marginTop: 20, 
  	marginLeft: 20,
  },
  messageSendIcon: {
  	width: 30, 
  	fontSize: 20,
  },
  messageInput: {
  	height: deviceHeight/12,
  },
  participants: {
  	flexDirection: 'column', 
  	marginTop: 30,
  },
  buttonGroup: {
  	justifyContent: 'space-around', 
  	flexDirection: 'row', 
  	marginTop: 20,
  },
  link: {
    textAlign: 'center',
    marginTop: 15,
  },
}