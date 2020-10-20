import React from "react"
import { View, Text, Image, ActivityIndicator} from "react-native"

class Splash extends React.Component {
    render() {
        return (
            <View style={{height:"100%", alignItems: "center", justifyContent: "center", backgroundColor: '#77acd1' }}>
                <Text style = {{color: "white", fontSize: 30, marginBottom: 50}}>MY APP</Text>
                <Image
                    source={require("../assets/atom.png")}
                    style={{ height: 150, width: 150 }}
                />
                <ActivityIndicator style = {{marginTop: 50}} size = "large" color = "" />
                <Text style = {{color: "white", fontSize: 30, marginTop:50, fontStyle: "italic"}}>Start</Text>
                <Text style = {{color: "white", fontSize: 30, fontStyle: "italic"}}>Learn React Native </Text>
            </View>
        )
    }
}
    export default Splash;
