import { useEffect, useState } from 'react';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import { Close, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/joy';
import { ITodo } from '../../types/interfaces';

interface todoListItemProps {
    key: number,
    todo: ITodo
}

export default function TodoListItem({ key, todo }: todoListItemProps) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isMediumScreen, setIsMediumScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.matchMedia('(max-width: 600px)').matches);
            setIsMediumScreen(window.matchMedia('(max-width: 1024px)').matches);
        };

        // Initial check
        handleResize();

        // Add event listener on resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <ListItem
            sx={{
                mt: 1
            }}
            key={key}
            startAction={
                // Display IconButton for small/medium screens
                todo.completed ?
                    (
                        <IconButton sx={{
                            pr: 1
                        }}>
                            <CheckBox />
                        </IconButton>

                    )
                    :
                    (
                        <IconButton>
                            <CheckBoxOutlineBlank />
                        </IconButton>

                    )


            }
            endAction={
                <IconButton>
                    <Close />
                </IconButton>
            }
        >
            <ListItemButton
                sx={{
                    borderRadius: 5,
                    border: '1px solid',
                    borderColor: 'neutral.300',
                    py: 1.5,
                }}
            >
                <Typography
                    maxWidth={isSmallScreen || isMediumScreen ? '90%' : '80%'}
                    noWrap
                    sx={{
                        textDecoration: `${todo.completed ? "line-through": ""}`,
                        color: `${todo.completed ? "neutral.500": ""}`
                        
                    }}
                    textOverflow={'ellipsis'}
                    level={isSmallScreen || isMediumScreen ? 'body-sm' : 'body-lg'}
                >
                    {todo.todo}
                </Typography>
            </ListItemButton>
        </ListItem>
    );
}
