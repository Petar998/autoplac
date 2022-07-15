import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../components/header';
import Home from '../screens/home';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Početna stranica' navigation={navigation} />
            }
        },
    },
};

const HomeStack = createStackNavigator(screens, {
    //   defaultNavigationOptions: {
    //     headerTintColor: '#444',
    //     headerStyle: { backgroundColor: '#eee', height: 60 }
    //   }
});

export default HomeStack;