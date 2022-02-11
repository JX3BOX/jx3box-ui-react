import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './vite.less';
import Header from '@components/header';
import Footer from '@components/footer';
import Layout from '@components/layout';
import Breadcrumb from '@components/breadcrumb';

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
      <Breadcrumb />

      <LeftSidebar>
        <LeftSidebarContent />
      </LeftSidebar>

      <Main>
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
