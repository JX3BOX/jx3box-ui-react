import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './vite.less';
import Header from '@components/header';
import Footer from '@components/footer';
import LeftSidebar from '@components/sidebar/left-sidebar';

const LeftSidebarContent = (props: any) => {
  const { toggleLeftSidebar } = props;
  return <span onClick={toggleLeftSidebar}>hello</span>;
};

const App = () => (
  <>
    <Header />
    <LeftSidebar>
      <LeftSidebarContent />
    </LeftSidebar>
    <Footer />
  </>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
