import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { RootParamList } from '../types/Navigation';
// import { getUserToken } from '../store/auth/selectors';
// import { useAppSelector, useApiErrorPrompt, useAppDispatch } from '../hooks';
import { Login, SignUp, ForgotPassword } from '../screens';
import HomeStack from './HomeStack';
import { SIGN_UP, FORGOT_PASSWORD, LOGIN, HOME_STACK } from './routes';

import { SCREEN_ANIMATION } from '../constants/general';
import { COLORS } from '../constants/styles';


const Stack = createNativeStackNavigator<RootParamList>();

const RootStack: React.FC = () => {
  const userToken = false 

  const onboardingHeaderStyles: NativeStackNavigationOptions = {
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: COLORS.GRAY_LIGHT,
    },
    headerTitleAlign: 'center',
    headerTintColor: COLORS.MAIN_DEFAULT,
  };

 

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: SCREEN_ANIMATION,
          headerBackTitle: '',
        }}
      >
        {!!userToken && (
          <>
            <Stack.Screen name={HOME_STACK} component={HomeStack} />
          </>
        )}
        {!userToken && (
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
