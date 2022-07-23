import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../components/header';
import AllUsers from '../screens/user/allUsers';
import NewUser from '../screens/user/newUser'
import EditUser from '../screens/user/editUser';

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
            title: 'Izmeni korisnika',
        }
    },
};

const usersStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { marginTop: 10 }
    }
});

export default usersStack;