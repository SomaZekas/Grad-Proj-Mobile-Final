import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from '../screens/home'
import AddGuest from '../screens/addGuest'
import GenerateQR from '../screens/GenerateQR'

const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false,
            headerTransparent: true,
            headerTintColor: '#fff',
        },
    },
    AddGuest: {
        screen: AddGuest,
        navigationOptions: {
            title: 'Add Guest',
            headerTransparent: true,
            headerTintColor: '#fff',
        },
    },
    GenerateQR: {
        screen: GenerateQR,
        navigationOptions: {
            title: 'Generated QR Code',
            headerTransparent: true,
            headerTintColor: '#fff',
        },
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);