import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';


import * as Layout from '../../components/layout';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

export default function TeamExample() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <SideBar />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={[
          drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          },
        ]}
      >
        <Layout.Header>
            <Header/>
        </Layout.Header>
        <Layout.SideNav>
          <SideBar />
        </Layout.SideNav>
        <Layout.Main>
          <h1>Hello</h1>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}