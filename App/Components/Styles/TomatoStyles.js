import { StyleSheet, Dimensions  } from 'react-native'
import { Fonts, Colors, Images } from '../../Themes/'

export default StyleSheet.create({
    userImage: {
        width: 50,
        height: 50,
        marginHorizontal: 15
      },
      foregroundContainer: {
        width: Dimensions.get('window').width,
        height: 140,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      },
      logoutButton: {
        position: 'absolute',
        top: 60,
        right: 15
      },
      viewCountryList:{
        flexDirection: 'column', 
        justifyContent: 'space-between'
      },
      btnHomeStyle:{
        borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0
      }
})
