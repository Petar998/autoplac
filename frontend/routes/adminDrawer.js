import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import HomeStack from './homeStack';
import CarsStack from './carsStack';
import UsersStack from './userStack';

const RootDrawerNavigator = createDrawerNavigator({
    Početna: {
        screen: HomeStack,
        navigationOptions: { drawerIcon: <MaterialIcons name='home' size={18} /> }
    },
    Vozila: {
        screen: CarsStack,
        navigationOptions: { drawerIcon: <MaterialIcons name='directions-car' size={18} /> }
    },
    Korisnici: {
        screen: UsersStack,
        navigationOptions: { drawerIcon: <FontAwesome name='user' size={18} /> }
    }
}, {
    unmountInactiveRoutes: true,
    contentOptions: {
        inactiveTintColor: '#000000',
        activeTintColor: '#000080',
        itemStyle: {
            marginTop: 10
        }
    },
});

export default createAppContainer(RootDrawerNavigator);