import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../components/header';
import AllUsers from '../screens/users/allUsers';
import NewUser from '../screens/users/newUser'
import EditUser from '../screens/users/editUser';

const screens = {
    AllUsers: {
        screen: AllUsers,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Korisnici' navigation={navigation} />,
                headerLeft: null,
            }
        },
    },
    NewUser: {
        screen: NewUser,
        navigationOptions: {
            title: 'Novi korisnik',
        }
    },
    EditUser: {
        screen: EditUser,
        navigationOptions: {
            title: 'Izmena podataka o korisniku',
        }
    },
};

const usersStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { marginTop: 10 }
    }
});

export default usersStack;