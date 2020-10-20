import React from "react"
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, Image , ActivityIndicator} from "react-native"
import styles from "./style.js"
import AsyncStorage from '@react-native-community/async-storage'
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      mata: true,
      loading: false,
    };
  }

  gotoRegister() {
    this.props.navigation.navigate('Register');
  }

  gotoReset() {
    this.props.navigation.navigate('Forgot');
  }

  gotoHome() {
    this.props.navigation.navigate('Home');
  }

  login() {
    const { email, password } = this.state;

    this.setState({ loading: true });
    //POST json
    var dataToSend = {
      email: email,
      password: password,
    };

    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    //POST request
    fetch('http://restful-api-laravel-7.herokuapp.com/api/login', {
      method: 'POST', //Request Type
      body: formBody, //post body
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        // alert(JSON.stringify(responseJson));
        const { token } = responseJson;
        if (token) {
          AsyncStorage.setItem('token', token).then((value) => {
            this.gotoHome();
          });
          this.setState({ loading: false });
        } else {
          alert('Email atau kata sandi salah');
          this.setState({ loading: false });
        }
      })
      //If response is not in json then in error
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
  }
  ubaheye = () => {
    const eyey = !this.state.mata
    this.setState({ mata: eyey })
  }
  render() {
    return (
      <View>
        <View style={styles.view1}>
          <Text style={styles.text1}>My App</Text>
        </View>
        <View style={styles.view2}>
          <TouchableOpacity onPress={() => alert("ini gambar")}>
            <Image style={styles.image1}
              source={require("../assets/native.jpg")} />
          </TouchableOpacity>
          <Text style={styles.text2}>Learn React Native</Text>
          <Text style={{ color: "white", marginTop: 65, marginLeft: 65 }}>Email :</Text>
          <View style={styles.view3}>
            <TextInput placeholder="Username Atau Email" style={{ marginLeft: 15, marginTop: 10, borderColor: "white", fontSize: 15 }} onChangeText={(email) => this.
              setState({ email })} />
          </View>
          <Text style={{ color: "white", marginTop: 15, marginLeft: 65 }}>Password :</Text>
          <View style={styles.view3}>
            <TextInput secureTextEntry={this.state.mata} placeholder="Masukan Password" style={{ marginTop: 10, marginLeft: 15, borderColor: "white", fontSize: 15, justifyContent: "center" }} onChangeText={(password) => this.setState({ password })} />
            <TouchableOpacity onPress={() => this.ubaheye(4)}>
              <Image
                style={{ height: 15, width: 20, marginTop: 13, marginRight: 15, opacity: 0.5 }}
                source={this.state.mata ? require("../assets/tutupmata.png") : require("../assets/bukamata.png")}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => alert("masuk ke halaman lupa password")}>
            <Text style={{ color: "white", alignSelf: "center", marginLeft: 140, marginTop: 1 }}>Lupa Password ?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.login()} >
            {this.state.loading ? (
              <ActivityIndicator color="white" />
            ) :
              <View style={styles.view4}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Login</Text>
          </View>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
            <Text style={{ color: "white", alignSelf: "center", marginTop: 5, }}>Tidak Punya Akun ? Buat Akun</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Login;
