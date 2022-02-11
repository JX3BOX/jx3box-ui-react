import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './vite.less';
import Header from '@components/header';
import Footer from '@components/footer';
import Layout from '@components/layout';

const { LeftSidebar } = Layout;

const LeftSidebarContent = (props: any) => {
  const { toggleLeftSidebar } = props;
  return <span onClick={toggleLeftSidebar}>hello</span>;
};

const App = () => (
  <>
    <Header />
    <Layout>
      <LeftSidebar>
        <LeftSidebarContent />
      </LeftSidebar>
    </Layout>
    <Footer />
  </>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
