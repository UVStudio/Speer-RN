import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const FollowScreen = ({navigation}: any) => {
  return (
    <View style={styles.center}>
      <Text>Follow Screen</Text>
      <Button
        title="Go to Follow"
        onPress={() => navigation.navigate('Follow')}
      />
      <Button title="Go back to Search" onPress={() => navigation.popToTop()} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FollowScreen;
