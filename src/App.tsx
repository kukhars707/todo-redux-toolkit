import React, {useState, useCallback} from 'react';
import {useAppSelector, useAppDispatch} from './hooks';
import {create, remove, complate} from './store/todosReducer';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const App: React.FC = (): React.ReactElement => {
    const [todo, setTodo] = useState('');
    const [validadion, setValidadion] = useState(false);
    const task = useAppSelector((state) => state.todos);
    const dispatch = useAppDispatch();
    const handleAddTodo = useCallback(() => {
        if (!todo) {
            setValidadion(true);
        } else {
            dispatch(create(todo));
            setValidadion(false);
            setTodo('');
        }
    }, [todo, dispatch]);
    return (
        <Box sx={{backgroundColor: '#f3f3f3', height: '100vh'}}>
            <AppBar position="static" sx={{marginBottom: '20px'}}>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Todo List
                </Typography>
            </AppBar>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{display: 'flex', marginBottom: '20px', width: 360, justifyContent: 'space-between'}}>
                    <TextField
                        value={todo}
                        error={validadion}
                        label="Todo"
                        placeholder="Enter your task"
                        onChange={(e) => setTodo(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleAddTodo}>
                        add
                    </Button>
                </Box>
                {task.length > 0 && (
                    <List dense sx={{width: 360, maxWidth: 360, bgcolor: 'background.paper'}}>
                        {task.map((item) => (
                            <ListItem key={item.id}>
                                <ListItemText>{item.todo}</ListItemText>
                                <IconButton color="error" component="span" onClick={() => dispatch(remove(item.id))}>
                                    <DeleteForeverIcon />
                                </IconButton>
                                <Checkbox
                                    onChange={(e) => dispatch(complate({id: item.id, checked: e.target.checked}))}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        </Box>
    );
};

export default App;
