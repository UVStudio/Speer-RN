import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from '@rneui/themed';
import {initialCardText} from '../screens/Search';
import {colorCardBorder} from '../utils/theme';

interface TextType {
  title: string;
  body: string;
}

interface CardProps {
  setCardText: React.Dispatch<React.SetStateAction<TextType>>;
  text: TextType;
}

const CustomCard = (props: CardProps) => {
  const {text, setCardText} = props;

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>
        {text.title}
      </Text>
      <Text style={styles.body}>{text.body}</Text>
      <Button
        containerStyle={styles.button}
        title="Ok"
        onPress={() => setCardText(initialCardText)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '80%',
    height: 200,
    backgroundColor: '#fff',
    opacity: 1,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: colorCardBorder,
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
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    marginTop: 15,
    width: 150,
  },
});

export default CustomCard;
