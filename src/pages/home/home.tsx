import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';


import * as Layout from '../../components/layout';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { Typography } from '@mui/joy';
import Todo from '../../components/todo/Todo';

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
          <Typography level='h1'>To do:</Typography>
          <Todo/>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}