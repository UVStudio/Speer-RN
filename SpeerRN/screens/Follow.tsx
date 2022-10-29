import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import {Octokit} from '@octokit/rest';
import {Avatar, Button, Text, ListItem} from '@rneui/themed';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {User} from '../utils/userType';
import {RootStackParamList} from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Follow'>;

const FollowScreen = ({navigation, route}: Props) => {
  const [profiles, setProfiles] = useState<User[]>([]);

  const {username, type} = route.params;
  let url = route.params.url;
  //there seems to be an error with the url returned for following_url
  //eg: https://api.github.com/users/UVStudio/following{/other_user}
  //it should be: https://api.github.com/users/UVStudio/following
  //the below code cleans
  const cleanUrl = () => {
    if (type === 'following') {
      url = url.slice(0, -13);
    }
  };
  cleanUrl();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.github.com/users/${username}/${type}`,
      );
      setProfiles(response.data);
    };
    fetchData();
  }, [type, username]);

  const toProfile = async (profile: User) => {
    const octokit = new Octokit({});
    const response = await octokit.request('GET /users/{username}', {
      username: profile.login,
    });
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
    navigation.push('Profile', {
      user: responseUser,
    });
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.center}>
        <ScrollView style={{width: '100%'}}>
          <Text h4 style={styles.title}>
            {username}'s {type}
          </Text>
          <View>
            {profiles
              ? profiles.map((profile: User, i: number) => (
                  <ListItem
                    onPress={() => toProfile(profile)}
                    key={i}
                    bottomDivider>
                    <Avatar
                      size={64}
                      rounded
                      source={{uri: profile.avatar_url}}
                    />
                    <ListItem.Content>
                      <ListItem.Title>{profile.login}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                ))
              : null}
          </View>
          <View>
            <Button
              containerStyle={styles.button}
              title="Go back to Search"
              onPress={() => navigation.popToTop()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  button: {
    marginTop: 15,
    minWidth: 150,
  },
  row: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  title: {
    marginVertical: 8,
    alignSelf: 'center',
  },
});

export default FollowScreen;
