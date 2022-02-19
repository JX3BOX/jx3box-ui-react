import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Header, Footer, Layout, Breadcrumb, Thx } from './index.esm';
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
  <Layout>
    <Header />
    <Breadcrumb name='频道名称' slug='slug' root='/slug' logo={<img src={Jx3Logo} />}>
      bread info
    </Breadcrumb>

    <LeftSidebar>
      <LeftSidebarContent />
    </LeftSidebar>

    <Main>
      <Thx postId={31129} postType='tool' userId={59236} />

      <RightSidebar>
        <RightSidebarContext />
      </RightSidebar>
      <Footer />
    </Main>
  </Layout>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
