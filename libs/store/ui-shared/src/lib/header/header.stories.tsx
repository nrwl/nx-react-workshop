import { Story, Meta } from '@storybook/react';
import { Header, HeaderProps } from './header';

export default {
  component: Header,
  title: 'Header',
} as Meta;

const Template: Story<HeaderProps> = (args: HeaderProps) => <Header {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
