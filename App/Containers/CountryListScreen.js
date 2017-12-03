import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import RoundedButton from '../Components/RoundedButton'
import { Images, Colors, Metrics } from '../Themes'
import { List, ListItem,Button } from 'react-native-elements'
import HeaderCenterComponent from '../Components/HeaderCenterComponent'
import style from '../Components/Styles/TomatoStyles'

const list = [
  {
    name: 'USA',
    avatar_url: 'http://flaglane.com/download/american-flag/american-flag-large.png',
    subtitle: 'Vice President'
  },
  {
    name: 'NEW JERSEY',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/New_Jersey_State_Flag.svg/1200px-New_Jersey_State_Flag.svg.png',
    subtitle: 'Vice Chairman'
  }
]



export default class CountryListScreen extends Component {
    _handleStories (navigate) {
        navigate('HomeScreen')
      }

  render () {
    const { navigate } = this.props.navigation
    return (
      <View>
        <View>
            <HeaderCenterComponent  
                text='Select City' 
                textColor={Colors.snow}>
            </HeaderCenterComponent>
        </View>
        <View>
        <List containerStyle={{marginBottom: 20}}>
        {
            list.map((l, i) => (
            <ListItem
                roundAvatar
                avatar={{uri:l.avatar_url}}
                key={i}
                title={l.name}
            />
            ))
        }
        </List>  
        </View>  
        <View style={style.viewCountryList}>
            <Button title="CANCEL" onPress={() => this._handleStories(navigate)} backgroundColor='#03A9F4'></Button>
        </View>  
      </View>
    )
  }
}
