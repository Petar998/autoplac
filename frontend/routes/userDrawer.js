import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

import HomeStack from './homeStack';
import CarsStack from './carsStack';
import SellStack from './sellStack';

const RootDrawerNavigator = createDrawerNavigator({
    Početna: {
        screen: HomeStack,
        navigationOptions: { drawerIcon: <MaterialIcons name='home' size={18} /> }
    },
    Vozila: {
        screen: CarsStack,
        navigationOptions: { drawerIcon: <MaterialIcons name='directions-car' size={18} /> }
    },
    Prodaje: {
        screen: SellStack,
        navigationOptions: { drawerIcon: <MaterialIcons name='shop' size={18} /> }
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