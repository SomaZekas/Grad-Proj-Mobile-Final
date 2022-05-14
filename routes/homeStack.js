import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from '../screens/home'
import AddGuest from '../screens/addGuest'
import GenerateQR from '../screens/GenerateQR'

const screens = {
    Home: {
        screen: Home
    },
    AddGuest: {
        screen: AddGuest
    },
    GenerateQR: {
        screen: GenerateQR
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);