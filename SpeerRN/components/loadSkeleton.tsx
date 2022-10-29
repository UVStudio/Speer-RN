import React from 'react';
import {View} from 'react-native';
import {Skeleton} from '@rneui/themed';

export const LoadSkeletonProfile = () => {
  return (
    <View>
      <Skeleton circle animation="pulse" width={300} height={300} />
      <Skeleton animation="wave" width={200} height={400} />
    </View>
  );
};
