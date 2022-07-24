import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../components/header';
import AllCars from '../screens/cars/allCars';
import NewCar from '../screens/cars/newCar'
import EditCar from '../screens/cars/editCar';

const screens = {
    AllCars: {
        screen: AllCars,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Vozila' navigation={navigation} />,
                headerLeft: null,
            }
        },
    },
    NewCar: {
        screen: NewCar,
        navigationOptions: {
            title: 'Novo vozilo',
        }
    },
    EditCar: {
        screen: EditCar,
        navigationOptions: {
            title: 'Izmena podataka o vozilu',
        }
    },
};

const carsStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { marginTop: 10 }
    }
});

export default carsStack;