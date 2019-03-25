import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import HomeScreen from '../Containers/HomeScreen'
import CountryListScreen from '../Containers/CountryListScreen'
import DetailScreen from '../Containers/DetailScreen'
import CategoriesDetailScreen from '../Containers/CategoriesDetailScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  HomeScreen: { screen: HomeScreen },
  CountryListScreen: { screen: CountryListScreen },
  DetailScreen: { screen: DetailScreen },
  CategoriesDetailScreen: { screen: CategoriesDetailScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HomeScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
