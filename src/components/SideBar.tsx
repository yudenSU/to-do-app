import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';

import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

import { useNavigate } from 'react-router-dom';

export default function SideBar() {

  const navigate = useNavigate();

  return (
    <List
      size="sm"
      sx={{ '--ListItem-radius': 'var(--joy-radius-sm)', '--List-gap': '4px' }}
    >
      <ListItem nested>
        <List
          aria-labelledby="nav-list-browse"
          sx={{ '& .JoyListItemButton-root': { p: '8px' } }}
        >
          <ListItem>
            <ListItemButton
              onClick={
                () => {
                  navigate('/')
                }}>
              <ListItemDecorator>
                <PeopleRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>To do</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={
                () => {
                  navigate('/help')
                }}>
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <HelpRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Help</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}