import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import RoundedButton from '../Components/RoundedButton'
import { Images, Colors, Metrics } from '../Themes'
import { List, ListItem,Button } from 'react-native-elements'
import HeaderCenterComponent from '../Components/HeaderCenterComponent'
import style from '../Components/Styles/TomatoStyles'
import {connect} from 'react-redux'
import TomatoActions from '../Redux/TomatoRedux'

const list = [
  {
    name: 'NEW YORK',
    avatar_url: 'http://flaglane.com/download/american-flag/american-flag-large.png',
    id: "280",
  },
  {
    name: 'NEW JERSEY',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/New_Jersey_State_Flag.svg/1200px-New_Jersey_State_Flag.svg.png',
    id: "3959",
  }
]



class CountryListScreen extends Component {

  _handleBack (navigate) {
    navigate('HomeScreen')
  }

  handleItem(id) {
    this.props.switchEntity(id)
    this.props.navigation.navigate('HomeScreen')
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
            <ListItem switched ={false}
                roundAvatar
                avatar={{uri:l.avatar_url}}
                key={i}
                title={l.name} onPress={()=>this.handleItem(l.id)}
            />
            ))
        }
        </List>
        </View>
        <View style={style.viewCountryList}>
            <Button title="CANCEL" onPress={() => this._handleBack(navigate)} backgroundColor='#03A9F4'></Button>
        </View>
      </View>
    )
  }
}


CountryListScreen.propTypes = {}

const mapStateToProps = (state) => {
  return {
    entity_id: state.tomato.entity_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchEntity: (id) => dispatch(TomatoActions.switchEntity(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryListScreen)

