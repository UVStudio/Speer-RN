import {UserObject} from '../screens/Search';
import {User} from './userType';

export const responseUserMapping = (responseUser: UserObject, data: User) => {
  return (responseUser = {
    avatar_url: data.avatar_url,
    login: data.login,
    name: data.name!,
    bio: data.bio!,
    followers: data.followers,
    followers_url: data.followers_url,
    following: data.following,
    following_url: data.following_url,
  });
};
