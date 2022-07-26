import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

import HomeStack from './homeStack';
import CarsStack from './carsStack';
import SellStack from './sellStack';

const RootDrawerNavigator = createDrawerNavigator({
    Početna: {
        screen: HomeStack,
        navigationOptions: { drawerIcon: (tabInfo) => <MaterialIcons name='home' size={18} color={tabInfo.tintColor} /> }
    },
    Vozila: {
        screen: CarsStack,
        navigationOptions: { drawerIcon: (tabInfo) => <MaterialIcons name='directions-car' size={18} color={tabInfo.tintColor} /> }
    },
    Prodaje: {
        screen: SellStack,
        navigationOptions: { drawerIcon: (tabInfo) => <MaterialIcons name='shop' size={18} color={tabInfo.tintColor} /> }
    }
}, {
    unmountInactiveRoutes: true,
    contentOptions: {
        inactiveTintColor: '#000000',
        activeTintColor: '#2196F3',
        itemStyle: {
            marginTop: 10
        }
    },
});

export default createAppContainer(RootDrawerNavigator);