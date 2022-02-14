import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Breadcrumb } from '../../build/index';

/**
 * ```javscript
 * <Breadcrumb name='频道名称' slug='slug' root='/slug' logo={<Jx3Logo />}>
 *  bread info
 * </Breadcrumb>
 * ```
 *
 */

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Breadcrumb',
  component: Breadcrumb,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Breadcrumb>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Breadcrumb> = args => <Breadcrumb {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  name: '频道名称',
  slug: 'slug',
  root: '/slug',
};
