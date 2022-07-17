import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../components/header';
import Home from '../screens/home';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Početna' navigation={navigation} />
            }
        },
    },
};

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { marginTop: 10 }
    }
});

export default HomeStack;