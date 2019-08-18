import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    containerFlex: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    container: {
      flex: 1,
      marginTop: 40,
      alignItems: 'center',
      backgroundColor: '#fff',
      justifyContent: 'center'
    },
    header: {
      height: 30,
      width: '100%',
      backgroundColor: 'pink'
    },
    row: {
      flexDirection: 'row'
    },
    label: {
      fontSize: 16,
      color: 'black',
      marginRight: 10,
      fontWeight: 'bold'
    },
    info: {
      fontSize: 16,
      color: 'grey'
    }
  });