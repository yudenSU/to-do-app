import * as React from 'react';
import SideBar from '../SideBar';
import Header from './Header';
import Main from './Main';
import Root from './Root';
import SideDrawer from './SideDrawer';
import SideNav from './SideNav';
import HeaderContent from '../HeaderContent';

export default function StandardLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);


  return (
    <>
      {drawerOpen && (
        <SideDrawer onClose={() => setDrawerOpen(false)}>
          <SideBar />
        </SideDrawer>
      )}
      <Root
        sx={[
          drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          },
        ]}
      >
        <Header>
          <HeaderContent />
        </Header>
        <SideNav>
          <SideBar />
        </SideNav>
        <Main>
          {children}
        </Main>
      </Root>
    </>
  );
}