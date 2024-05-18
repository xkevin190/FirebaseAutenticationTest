import {
  NativeStackNavigationProp,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {
  RouteProp,
  RouteConfig,
  NavigationState,
  EventMapBase,
  ParamListBase,
  DefaultNavigatorOptions,
} from '@react-navigation/native';

import * as ROUTES from '../navigation/routes';

// ROOT STACK
export type RootParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.SIGN_UP]: undefined;
  [ROUTES.FORGOT_PASSWORD]: undefined;
  [ROUTES.HOME_STACK]: undefined;
};
export type useNavigationRootStack = NativeStackNavigationProp<RootParamList>;

// HOME STACK
export type useNavigationHomeStack = NativeStackNavigationProp<{
  [ROUTES.HOME]: undefined;
}>;

export type useNavigationProfileStack =
  NativeStackNavigationProp<ProfileParamList>;
export type useRouteProfileStack = RouteProp<ProfileParamList>;

// STACK NAVIGATION SCREEN
export type StackScreen<RouteName extends keyof ParamListBase> = RouteConfig<
  ParamListBase,
  RouteName,
  NavigationState,
  {},
  EventMapBase
>;

// STACK NAVIGATION NAVIGATOR
export type StackNavigator = DefaultNavigatorOptions<
  ParamListBase,
  NavigationState,
  NativeStackNavigationOptions,
  EventMapBase
>;
