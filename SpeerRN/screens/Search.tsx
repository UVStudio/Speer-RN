import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from '@rneui/themed';
import {Octokit} from '@octokit/rest';
import CustomCard from '../components/CustomCard';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export const initialCardText = {
  title: '',
  body: '',
};

export interface UserObject {
  avatar_url: string;
  username: string;
  name: string;
  description: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
}

const SearchScreen = ({navigation}: Props) => {
  const [input, setInput] = useState('');
  const [cardText, setCardText] = useState(initialCardText);

  const searchUser = async (inputParam: string) => {
    try {
      const octokit = new Octokit({});
      const response = await octokit.request('GET /users/{username}', {
        username: inputParam,
      });
      if (response.data.id > 0) {
        const responseUser = {
          avatar_url: response.data.avatar_url,
          username: response.data.login,
          name: response.data.name!,
          description: response.data.bio!,
          followers: response.data.followers,
          followers_url: response.data.followers_url,
          following: response.data.following,
          following_url: response.data.following_url,
        };
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
