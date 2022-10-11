import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { Colors, height } from 'styles';

export default StyleSheet.create({
  textBox: {
    height: height > 640 ? 42 : 32,
    borderWidth: 1,
    borderColor: Colors.LIGHTER_GREY,
  },
  backgroundOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#000',
    opacity: 0.3,
  },
  buttonSeleted: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentageToDP(2),
    flex: 1,
    flexDirection: 'row',
    borderColor: Colors.BORDER,
    borderWidth: 1,
  },
  containerItems: { alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' },
  wrapperItems: {
    width: '90%',
  },
  listItemsStyle: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 'auto',
  },
  wrapperSearchInput: {
    width: '100%',
    marginVertical: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.BORDER,
  },
  itemStyle: {
    marginVertical: heightPercentageToDP(1),
    paddingVertical: heightPercentageToDP(1),
  },
  seletedItemStyle: {
    color: Colors.LIGHT_BLUE,
  },
  placeholder: {
    color: Colors.BORDER,
  },
  textDisplay: {
    fontSize: 12,
  },
  textInput: {
    padding: 5,
  },
});
