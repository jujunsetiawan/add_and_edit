import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import Login from "./login";
import Register from "./register";
import Home from './home';

const Stack = createStackNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name = "Login" component = {Login} options = {{headerShown:false}}/>
                <Stack.Screen name = "Register" component = {Register} options = {{headerShown:false}}/>
                <Stack.Screen name = "Home" component = {Home} options = {{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;