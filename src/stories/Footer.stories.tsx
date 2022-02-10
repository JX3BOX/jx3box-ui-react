import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Footer } from '../../build/index';

export default {
  title: 'Example/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = args => <Footer {...args} />;
