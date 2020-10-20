import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Login from "./src/Components/login";
import Navigation from './src/Components/navigator';
import Register from "./src/Components/register";
import Splash from "./src/Components/splashscreen";

class App extends Component {

  constructor() {
    super()
    console.log("ini Dari constructor");
  }
  state = {role:true}

  splash = () => {
    if(this.state.role) {
      return(
        <Splash/>
      )
    } else {
      return <Navigation/>
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ role: false })
    }, 3000)
    console.log("Ini Dari Update");
  }
  render() {
    return (
      <View style = {{flex:1}}>
        {this.splash()}
      </View>

    )
  }
}

export default App;