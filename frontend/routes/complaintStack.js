import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../components/header';
import AllComplaints from '../screens/complaints/allComplaints';
import NewComplaint from '../screens/complaints/newComplaint'
import EditComplaint from '../screens/complaints/editComplaint';

const screens = {
    AllComplaints: {
        screen: AllComplaints,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Reklamacije' navigation={navigation} />,
                headerLeft: null,
            }
        },
    },
    NewComplaint: {
        screen: NewComplaint,
        navigationOptions: {
            title: 'Nova reklamacija',
        }
    },
    EditComplaint: {
        screen: EditComplaint,
        navigationOptions: {
            title: 'Izmena podataka o reklamaciji',
        }
    },
};

const complaintsStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { marginTop: 10 }
    }
});

export default complaintsStack;