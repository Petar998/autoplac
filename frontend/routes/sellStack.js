import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../components/header';
import AllSells from '../screens/sells/allSells';
import NewSell from '../screens/sells/newSell'
import EditSell from '../screens/sells/editSell';

const screens = {
    AllSells: {
        screen: AllSells,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Prodaje' navigation={navigation} />,
                headerLeft: null,
            }
        },
    },
    NewSell: {
        screen: NewSell,
        navigationOptions: {
            title: 'Nova prodaja',
        }
    },
    EditSell: {
        screen: EditSell,
        navigationOptions: {
            title: 'Izmena podataka o prodaji',
        }
    },
};

const sellStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { marginTop: 10 }
    }
});

export default sellStack;