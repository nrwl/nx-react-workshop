import React from 'react';
import { Header, HeaderProps } from './header';

export default {
  component: Header,
  title: 'Header',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: HeaderProps = {};

  return <Header />;
};
