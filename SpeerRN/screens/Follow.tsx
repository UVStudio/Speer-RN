import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import CustomCard from '../components/CustomCard';
import {Avatar, Button, Text, ListItem} from '@rneui/themed';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {User} from '../utils/userType';
import {RootStackParamList} from '../App';
import {responseUserMapping} from '../utils/responseUser';
import {initialCardText} from '../screens/Search';
import {getUserOctokit} from '../utils/getUser';
import {colorPrimaryTitle} from '../utils/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Follow'>;

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

const FollowScreen = ({navigation, route}: Props) => {
  const [profiles, setProfiles] = useState<User[]>([]);
  const [cardText, setCardText] = useState(initialCardText);

  const {login, type} = route.params;
  let url = route.params.url;

  //there seems to be an error with the url returned for following_url
  //eg - it is: https://api.github.com/users/UVStudio/following{/other_user}
  //it should be: https://api.github.com/users/UVStudio/following
  //the cleanUrl function cleans it up
  const cleanUrl = () => {
    if (type === 'following') {
      url = url.slice(0, -13);
    }
  };
  cleanUrl();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.github.com/users/${login}/${type}`,
      );
      setProfiles(response.data);
    };
    fetchData();
  }, [type, login]);

  const toProfile = async (profile: User) => {
    try {
      const response = await getUserOctokit(profile.login);

      //catch edge cases from GitHub API
      if (response.data.id > -1 && response.data.login !== '') {
        responseUser = responseUserMapping(responseUser, response.data);

        navigation.push('Profile', {
          user: responseUser,
        });
      }
    } catch (error) {
      setCardText({
        title: 'Server Error',
        body: 'Please try again later',
      });
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.center}>
        {cardText.title !== '' ? (
          <CustomCard text={cardText} setCardText={setCardText} />
        ) : null}
        <ScrollView style={{width: '100%'}}>
          <Text h4 style={styles.title}>
            {login}'s {type}
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
    marginVertical: 20,
    color: colorPrimaryTitle,
    alignSelf: 'center',
  },
});

export default FollowScreen;
