import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '@rneui/themed';
import {initialCardText} from '../screens/Search';

const CustomCard = (props: any) => {
  console.log('props: ', props);
  const {text, setCardText} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text.title}</Text>
      <Text>{text.body}</Text>
      <Button
        style={styles.button}
        title="Ok"
        onPress={() => setCardText(initialCardText)}
      />
    </View>
  );
};

//onPress={props.setCardText('')}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '88%',
    height: 200,
    backgroundColor: '#fff',
    opacity: 1,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: 'red',
    //iOS shadow
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    //android shadow
    elevation: 10,
    zIndex: 1000,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    margin: 5,
    width: 100,
  },
});

export default CustomCard;
