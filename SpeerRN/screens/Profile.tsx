import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Button, Text} from '@rneui/themed';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {colorPrimaryTitle} from '../utils/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = ({navigation, route}: Props) => {
  const {
    avatar_url,
    login,
    name,
    bio,
    followers,
    followers_url,
    following,
    following_url,
  } = route.params.user;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.center}>
        <View>
          <Avatar
            containerStyle={styles.containerStyle}
            size={256}
            rounded
            source={avatar_url !== '' ? {uri: avatar_url} : {}}
          />
        </View>
        <Text h2 style={styles.h2Style}>
          {login}
        </Text>
        <Text h4 style={styles.h4Style}>
          {name}
        </Text>
        <Text style={styles.body}>{bio}</Text>
        <View style={styles.row}>
          <Button
            containerStyle={styles.button}
            title={`${followers} ${followers > 1 ? 'Followers' : 'Follower'}`}
            onPress={() =>
              navigation.push('Follow', {
                url: followers_url,
                type: 'followers',
                login,
              })
            }
          />
          <Button
            containerStyle={styles.button}
            title={`${following} Following`}
            onPress={() =>
              navigation.push('Follow', {
                url: following_url,
                type: 'following',
                login,
              })
            }
          />
        </View>
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
    width: '80%',
  },
  button: {
    minWidth: 120,
  },
  row: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  h2Style: {
    color: colorPrimaryTitle,
    fontWeight: '700',
  },
  h4Style: {
    color: colorPrimaryTitle,
    fontWeight: '500',
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    marginVertical: 5,
  },
  containerStyle: {
    marginBottom: 15,
    //iOS shadow
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    //android shadow
    elevation: 10,
  },
});

export default ProfileScreen;
