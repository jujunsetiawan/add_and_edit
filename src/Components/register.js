import React from "react"
import {View,Text,Button,TouchableOpacity,TextInput,StyleSheet,Image} from "react-native"
import styles from "./styles.js"
class Register extends React.Component {
    render() {
        return (
      <View>
         <View style = {styles.view1}>
             <Text style = {styles.text1}>My App</Text>
         </View>
       <View style = {{backgroundColor: "#77acd1", flexDirection: "row"}}>
         <TouchableOpacity onPress = {() => this.props.navigation.navigate("Login")}>
             <Image style = {{height: 20, width:20, marginTop: 8, marginLeft: 10, opacity: 0.3}}
                 source = {require("../assets/back.png")}
             />
             </TouchableOpacity>
         <Text style = {styles.text3}>Register</Text>
        </View>
         <View style = {styles.view2}>
        <TouchableOpacity onPress = {() => alert("ini gambar")}>
        <Image style = {styles.image1}
          source = {require("../assets/native.jpg")}/>
        </TouchableOpacity>
        <Text style = {styles.text2}>Learn React Native</Text>
        <View style = {styles.view4}>
          <TextInput placeholder = "Nama" style = {{marginLeft: 15, marginTop: 5, borderColor: "white"}}/>
        </View>
        <View style = {styles.view3}>
          <TextInput placeholder = "Alamat Email" style = {{marginLeft: 15, marginTop: 5, borderColor: "white"}}/>
        </View>
        <View style = {styles.view3}>
          <TextInput secureTextEntry = {true} placeholder = "Password" style = {{marginLeft: 15, marginTop: 5, borderColor: "white"}}/>
        </View>
        <View style = {styles.view3}>
          <TextInput secureTextEntry = {true} placeholder = "Konfirmasi Password" style = {{marginLeft: 15, marginTop: 5, borderColor: "white"}}/>
        </View>
        <TouchableOpacity onPress = {() => alert("Registerasi Sukses")}>
          <View style = {styles.view5}>
            <Text style = {{color: "white", alignSelf: "center", fontWeight: "bold", fontSize: 20, marginTop: 5}}>Daftar Sekarang</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => this.props.navigation.navigate("Login")}>
          <Text style = {{color: "white", alignSelf: "center", marginTop: 40 }}>Sudah Punya Akun ? Login</Text>
        </TouchableOpacity>
         </View>
     </View>
        )
    }
}

export default Register;