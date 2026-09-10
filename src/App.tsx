import { useState, useEffect } from 'react';

import bridge, {
  UserInfo,
} from '@vkontakte/vk-bridge';

import {
  View,
  SplitLayout,
  SplitCol,
} from '@vkontakte/vkui';

import {
  useActiveVkuiLocation,
} from '@vkontakte/vk-mini-apps-router';

import {
  Persik,
  Home,
  Question1,
  Question2,
  Question3,
  Question4,
  Question5,
  Question6,
  Results,
  Catalog,
  SelectedHairstyle,
} from './panels';
import {
  DEFAULT_VIEW_PANELS,
} from './routes';

export const App = () => {
  const {
    panel: activePanel = DEFAULT_VIEW_PANELS.HOME,
  } = useActiveVkuiLocation();

  const [fetchedUser, setUser] =
    useState<UserInfo | undefined>();

  useEffect(() => {
    bridge
      .send('VKWebAppGetUserInfo')
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(
          'VK user info недоступен вне VK:',
          error,
        );
      });
  }, []);

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home
            id="home"
            fetchedUser={fetchedUser}
          />

          <Question1 id="question1" />
          <Question2 id="question2" />
          <Question3 id="question3" />
          <Question4 id="question4" />
          <Question5 id="question5" />
          <Question6 id="question6" />

          <Results id="results" />
          <Catalog id="catalog" />
          <SelectedHairstyle id="selected" />

          <Persik id="persik" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};