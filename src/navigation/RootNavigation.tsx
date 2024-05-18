import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import {RootParamList} from '../types/Navigation';
// import { getUserToken } from '../store/auth/selectors';
// import { useAppSelector, useApiErrorPrompt, useAppDispatch } from '../hooks';
import {Login, SignUp, ForgotPassword} from '../screens';
import HomeStack from './HomeStack';
import {SIGN_UP, FORGOT_PASSWORD, LOGIN, HOME_STACK} from './routes';

import {SCREEN_ANIMATION} from '../constants/general';
import {COLORS} from '../constants/styles';
import useAppSelector from '../hooks/useAppSelector';
import {getUserInfo} from '../store/Auth/selectors';
import {useVerifySession} from '../hooks/useVerifySession';

const Stack = createNativeStackNavigator<RootParamList>();

const RootStack: React.FC = () => {
  const userInfo = useAppSelector(getUserInfo);

  const onboardingHeaderStyles: NativeStackNavigationOptions = {
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: COLORS.GRAY_LIGHT,
    },
    headerTitleAlign: 'center',
    headerTintColor: COLORS.MAIN_DEFAULT,
  };

  useVerifySession();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: SCREEN_ANIMATION,
          headerBackTitle: '',
          headerShown: userInfo ? false : true,
        }}>
        {!!userInfo && (
          <>
            <Stack.Screen name={HOME_STACK} component={HomeStack} />
          </>
        )}
        {!userInfo && (
          <>
            <Stack.Screen
              name={LOGIN}
              component={Login}
              options={{
                ...onboardingHeaderStyles,
              }}
            />
            <Stack.Screen
              name={SIGN_UP}
              component={SignUp}
              options={{
                ...onboardingHeaderStyles,
              }}
            />

            <Stack.Screen
              name={FORGOT_PASSWORD}
              component={ForgotPassword}
              options={{
                ...onboardingHeaderStyles,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
