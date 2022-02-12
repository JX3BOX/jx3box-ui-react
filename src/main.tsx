import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './vite.less';
import Header from '@components/header';
import Footer from '@components/footer';
import Layout from '@components/layout';
import Breadcrumb from '@components/breadcrumb';
import Thx from '@components/thx';
import Jx3Logo from './assets/jx3.svg';

const { LeftSidebar, RightSidebar, Main } = Layout;

const LeftSidebarContent = (props: any) => {
  const { toggleLeftSidebar } = props;
  return <span onClick={toggleLeftSidebar}>hello</span>;
};

const RightSidebarContext = props => {
  return <span>RightSidebarContext</span>;
};

const App = () => (
  <>
    <Layout>
      <Header />
      <Breadcrumb name='频道名称' slug='slug' root='/slug' logo={<Jx3Logo />}>
        bread info
      </Breadcrumb>

      <LeftSidebar>
        <LeftSidebarContent />
      </LeftSidebar>

      <Main>
        <Thx postId={36942} postType='tool' userId={59236} />

        <RightSidebar>
          <RightSidebarContext />
        </RightSidebar>
        <Footer />
      </Main>
    </Layout>
  </>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
