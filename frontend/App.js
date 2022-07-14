import React, { createContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, DevSettings } from 'react-native';
import Login from './screens/login';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext(null);

const handleLogin = async (user) => {
  const allowedRoles = ['admin', 'seller'];
  try {
    const userResponse = await Axios.post(
      'http://localhost:3333/login',
      user,
      { withCredentials: false },
    );
    if (
      userResponse.data.message === 'Auth successful' &&
      allowedRoles.some((role) => userResponse.data.role.includes(role))
    ) {
      await AsyncStorage.setItem('user', JSON.stringify(userResponse.data));
      DevSettings.reload();
    }
  } catch (err) {
    if (err?.response?.data?.message) {
      console.log('\n Login error = ', err.response.data.message);
      Alert.alert('Error!', err.response.data.message, [{ text: "OK" }]);
    }
    else {
      console.log('\n Login error = ', err);
      Alert.alert('Error!', 'Something went wrong.', [{ text: "OK" }]);
    }
  }
};

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();

  if (user && typeof user === 'string') setUser(JSON.parse(user));

  const getUser = async () => {
    // await AsyncStorage.removeItem('user');
    const user = await AsyncStorage.getItem('user');
    setUser(user)
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user && new Date() > new Date(user.expires)) {
      console.log('Session expired!');
      setLoggedIn(false);
    } else if (user === null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [setLoggedIn, user]);

  return (
    <UserContext.Provider value={{ isLoggedIn, handleLogin, data: user }}>
      {isLoggedIn &&
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      }
      {!isLoggedIn && <Login />}
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;