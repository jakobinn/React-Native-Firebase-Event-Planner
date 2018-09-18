import React from "react";
import NavigationExperimental from "react-native-deprecated-custom-components";
import MainApp from "./MainApp";
import Item from "./Item";
import ChatS from "./ChatS";

var ROUTES = {
  mainapp: MainApp,
  item: Item,
  chat: ChatS
};

export default class App extends React.Component {
  renderScene(route, navigator) {
    let Component = ROUTES[route.name];
    return (
      <Component {...route.passProps} route={route} navigator={navigator} />
    );
  }

  render() {
    return (
      <NavigationExperimental.Navigator
        initialRoute={{ name: "mainapp" }}
        renderScene={this.renderScene}
        configureScene={() => {
          return NavigationExperimental.Navigator.SceneConfigs.FloatFromRight;
        }}
      />
    );
  }
}
