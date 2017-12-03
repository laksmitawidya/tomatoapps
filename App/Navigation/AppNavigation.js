import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import HomeScreen from '../Containers/HomeScreen'
import CountryListScreen from '../Containers/CountryListScreen'
import DetailScreen from '../Containers/DetailScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  HomeScreen: { screen: HomeScreen },
  CountryListScreen: { screen: CountryListScreen },
  DetailScreen: { screen: DetailScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
