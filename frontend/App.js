import React, { createContext, useEffect, useState } from 'react';
import { Alert, DevSettings, LogBox } from 'react-native';
import Login from './screens/login';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminNavigator from './routes/adminDrawer';
import UserNavigator from './routes/userDrawer';

export const UserContext = createContext(null);

const handleLogin = async (user) => {
  const allowedRoles = ['admin', 'user'];
  try {
    const userResponse = await Axios.post(
      'http://10.0.2.2:3333/login',
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
      Alert.alert('Greška!', err.response.data.message, [{ text: "OK" }]);
    }
    else {
      console.log('\n Login error = ', err);
      Alert.alert('Greška!', 'Došlo je do greške.', [{ text: "OK" }]);
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

  LogBox.ignoreAllLogs(true);
  return (
    <UserContext.Provider value={{ isLoggedIn, handleLogin, setLoggedIn, data: user }}>
      {isLoggedIn && user?.role === 'admin' ? <AdminNavigator /> : <UserNavigator />
      }
      {!isLoggedIn && <Login />}
    </UserContext.Provider>
  );
}

export default App;