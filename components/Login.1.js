// import libraly
import React, { Component } from 'react';
import {View, Text, TextInput, Image, Button } from 'react-native';
import axios from 'axios';
import {AsyncStorage} from 'react-native';


// write componenet
class Login extends Component{
	static navigationOptions = {
			title: "Login",
			headerStyle:{
				backgroundColor: '#FADBD8',
				color: '#FADBD8',
                fontSize: 20,
                
				},
				headerTintColor: "white",
	}
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onPressLogin = this.onPressLogin.bind(this);
    }
    onChangeEmail(e){
        this.setState({ email: e});
        console.log('Email : ',this.state.email);
    }
    onChangePassword(e){
        this.setState({ password: e});
        console.log('Password : ',this.state.password);
    }
    onPressLogin(){
        console.log(this.state)
        const url = "http://128.199.240.120:9999/api/auth/login";
        
        axios.post(url,this.state)
        .then(async function (resp){
            console.log(resp.data.data.token)
            alert("Login Successfully");
			try{
				await AsyncStorage.setItem('User_Token',resp.data.data.token);
                this.props.navigation.navigate("Profile");
                
			
			}catch(error){
				console.log(error);
			}
            
        }.bind(this))
        .catch(function (error){
            console.log(error)
			alert(error);
        })
    }
    async componentDidMount(){
        let token = await AsyncStorage.getItem("User_Token");
        if(token!=null){
            console.log(token);
            this.props.navigation.navigate("Profile");
        }
        
    }
    render(){
        return(
            <View style={{marginTop:60}}>
                <Image source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                <TextInput
                    style={{ fontSize:30, height:50}}
                    placeholder ="Email"
                    keyboardType ="email-address"
                    underlineColorAndroid ="transparent"
                    //onChangeText={(e) => this.setState({email:e})}
                    value={this.state.email}
                    onChangeText={this.onChangeEmail}
                />

                <TextInput
                    style={{ fontSize:30, height:50}}
                    placeholder ="Password"
                    secureTextEntry={true}
                    underlineColorAndroid ="transparent"
                    value={this.state.password}
                    onChangeText={this.onChangePassword}
                />
                    

                <Button
                    title="Login"
                    color="#D5DBDB"
                    onPress={this.onPressLogin}


                />
                <Button
                    title="Profile"
                    color="#D5DBDB"
                    onPress={ () => this.props.navigation.navigate('Profile')}
                />
            </View>
        );
    }
}

export default Login;
