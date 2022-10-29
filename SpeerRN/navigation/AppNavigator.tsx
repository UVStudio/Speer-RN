import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Icon} from '@rneui/themed';
import SearchScreen, {UserObject} from '../screens/Search';
import ProfileScreen from '../screens/Profile';
import FollowScreen from '../screens/Follow';
import {colorPrimary} from '../utils/theme';

interface userParam {
  user: UserObject;
}

export type RootStackParamList = {
  Search: undefined;
  Profile: userParam;
  Follow: {login: string; type: string; url: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const defaultNavOptions = {
  title: 'GitHub User Search App',
  headerStyle: {
    backgroundColor: colorPrimary,
  },
  headerTitleStyle: {
    fontSize: 22,
  },
  headerBackTitleVisible: false,
  headerTintColor: 'white',
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <Icon
              size={30}
              color="white"
              type="material"
              name="search"
              onPress={() => navigation.navigate('Search')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Follow"
        component={FollowScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <Icon
              size={30}
              color="white"
              type="material"
              name="search"
              onPress={() => navigation.navigate('Search')}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
