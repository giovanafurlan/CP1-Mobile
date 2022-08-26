import React, {
  useState,
  useEffect
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  StatusBar,
  Alert
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const onInit = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.navigate('Lista');
    }
  };

  var config = {
    method: 'post',
    url: 'https://prof-kaz-api.herokuapp.com/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data:{
      'username': inputUsername,
      'password': inputPassword
    }
  };

  const login = async () => {
    try {
      await axios(config)
        .then(function (response) {
          const data = (response.data);
            const token = data.token;
            console.log(token)
            AsyncStorage.setItem('token', token);
        })
        .catch(function (error) {
          alert('Usuário inválido');
        });
      navigation.replace('Lista');
    } catch (e) {
      console.log('login error', e)
      throw new Error("Erro na requisição")
    }
  };

  useEffect(() => { onInit(); }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.textInputRow}>
          <TextInput
            style={styles.textInput}
            placeholder={'Username'}
            value={inputUsername}
            onChangeText={(value) => setInputUsername(value)}
          />
        </View>
        <View style={styles.textInputRow}>
          <TextInput
            style={styles.textInput}
            placeholder={'Password'}
            secureTextEntry={true}
            value={inputPassword}
            onChangeText={(value) => setInputPassword(value)}
          />
        </View>

        <View style={styles.textInputRow}>
          <Pressable style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable >
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    padding: 8,
  },
  textInputLabel: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
  },
  textInputRow: {
    flex: 1,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderColor: 'black',
    borderWidth: 1,
  },
  messageContainer: {
    margin: 8,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMessage: {
    color: 'black',
    margin: 16,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: 'white',
  },
});