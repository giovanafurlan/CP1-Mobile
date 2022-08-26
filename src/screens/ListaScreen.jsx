import React, {
  useState,
  useEffect
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  StatusBar,
  FlatList
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListaScreen({ navigation }) {
  const [data, setData] = useState();

  const onInit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      var config = {
        method: 'get',
        url: 'https://prof-kaz-api.herokuapp.com/item',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      };

      axios(config)
        .then(function (response) {
          const result = (response.data);
          console.log(result);
          setData(result);
        })
        .catch(function (error) {
          console.log(error);
        });

    } catch (error) {
      console.log(error);
      throw new Error("Erro na requisção");
    }
  };

  const sair = () => {
    navigation.replace('Login');
    AsyncStorage.clear();
  } 

  useEffect(() => { onInit(); }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.textInputRow}>
          <Pressable style={styles.button} onPress={sair}>
            <Text style={styles.buttonText}>Sair</Text>
          </Pressable >
        </View>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View style={styles.flatlistItem}>
              <Text style={styles.flatlistItemText}>{item.descricao}</Text>
            </View>
          )}
        />
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
  bodyContainer: {
    margin: 8,
    marginTop: 16,
  },
  textInputRow: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: 'white',
  },
  flatlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ccc',
    borderRadius: 8,
    margin: 8,
    padding: 16,
  },
  flatlistItemText: {
    color: 'black',
  },
});