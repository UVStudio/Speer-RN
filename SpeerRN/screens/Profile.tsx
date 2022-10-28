import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Button, Text} from '@rneui/themed';

const ProfileScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const {
    avatar_url,
    username,
    name,
    description,
    followers,
    followers_url,
    following,
    following_url,
  } = route.params.user;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.center}>
        <Avatar
          size={256}
          rounded
          source={avatar_url !== '' ? {uri: avatar_url} : {}}
        />
        <Text h2 style={{marginVertical: 3}}>
          {username}
        </Text>
        <Text h4 style={{marginVertical: 2}}>
          {name}
        </Text>
        <Text style={{marginVertical: 5}}>{description}</Text>
        <View style={styles.row}>
          <Button
            containerStyle={styles.button}
            title={`${followers} ${followers > 1 ? 'Followers' : 'Follower'}`}
            onPress={() =>
              navigation.navigate('Follow', {
                url: followers_url,
                type: 'followers',
                username,
              })
            }
          />
          <Button
            containerStyle={styles.button}
            title={`${following} Following`}
            onPress={() =>
              navigation.navigate('Follow', {
                url: following_url,
                type: 'following',
                username,
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
    justifyContent: 'space-around',
    width: '100%',
  },
  textMargins: {
    marginVertical: 8,
  },
});

export default ProfileScreen;
