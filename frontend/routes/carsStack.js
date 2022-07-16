import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../components/header';
import AllCars from '../screens/cars/allCars';
import NewCar from '../screens/cars/newCar'

const screens = {
    AllCars: {
        screen: AllCars,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Vozila' navigation={navigation} />
            }
        },
    },
    NewCar: {
        screen: NewCar,
        navigationOptions: {
            title: 'Novo vozilo',
        }
    },
};

const carsStack = createStackNavigator(screens, {
    // defaultNavigationOptions: {
    //     headerTintColor: '#444',
    //     headerStyle: { backgroundColor: '#eee', height: 60 }
    // }
});

export default carsStack;