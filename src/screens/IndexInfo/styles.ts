import { StyleSheet, Platform } from 'react-native';
import { Styles, Colors, width } from 'styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: Styles.APP_BACKGROUND_COLOR,
  },
  tabBarContainer: {
    height: 50,
  },
  tabBar: {
    flexDirection: 'row',
    minWidth: width,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: Platform.OS === 'ios' ? undefined : 20,
    minWidth: width * 0.3,
  },
  tabActive: {
    color: Colors.PRIMARY_1,
    borderBottomColor: Colors.PRIMARY_1,
    borderBottomWidth: 2,
  },
  label: {
    color: Colors.PRIMARY_1,
    fontWeight: 'bold',
  },
});
