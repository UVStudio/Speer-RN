import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from '@rneui/themed';
import CustomCard from '../components/CustomCard';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {responseUserMapping} from '../utils/responseUser';
import {getUserOctokit} from '../utils/getUser';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export const initialCardText = {
  title: '',
  body: '',
};

export interface UserObject {
  avatar_url: string;
  login: string;
  name: string;
  bio: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
}

let responseUser = {
  avatar_url: '',
  login: '',
  name: '',
  bio: '',
  followers: 0,
  followers_url: '',
  following: 0,
  following_url: '',
};

const SearchScreen = ({navigation}: Props) => {
  const [input, setInput] = useState('');
  const [cardText, setCardText] = useState(initialCardText);

  const searchUser = async (inputParam: string) => {
    try {
      const response = await getUserOctokit(inputParam);
      //catch edge cases from GitHub API
      if (response.data.id > -1 && response.data.login !== '') {
        responseUser = responseUserMapping(responseUser, response.data);

        setInput('');
        navigation.navigate('Profile', {
          user: responseUser,
        });
      }
    } catch (error) {
      setCardText({
        title: 'Username Not Found',
        body: 'Please try another username',
      });
    }
  };

  return (
    <View style={styles.center}>
      {cardText.title !== '' ? (
        <CustomCard text={cardText} setCardText={setCardText} />
      ) : null}
      <Input
        leftIcon={{type: 'font-material', name: 'search'}}
        autoCapitalize="none"
        onChangeText={setInput}
        value={input}
        placeholder="GitHub Username"
      />
      <Button
        containerStyle={styles.button}
        title="Search"
        onPress={() => searchUser(input)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    minWidth: 150,
  },
});

export default SearchScreen;
