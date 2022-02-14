import React from 'react';
import { Layout, Header, Breadcrumb, Footer, Thx } from '../../build/index';

const { LeftSidebar, Main, RightSidebar } = Layout;

const LeftSidebarContent = props => {
  const { toggleLeftSidebar } = props;
  return <span onClick={toggleLeftSidebar}>hello</span>;
};

console.log('LeftSidebar', LeftSidebar);
const FullLayout = () => (
  <Layout>
    <Header />
    <Breadcrumb name='频道名称' slug='slug' root='/slug'>
      bread info
    </Breadcrumb>

    <LeftSidebar>
      <LeftSidebarContent />
    </LeftSidebar>

    <Main>
      <Thx postId={31129} postType='tool' userId={59236} />
      <RightSidebar>right sidebar context</RightSidebar>
      <Footer />
    </Main>
  </Layout>
);

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Layout',
  component: FullLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = args => <FullLayout />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
