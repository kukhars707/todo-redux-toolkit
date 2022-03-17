import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './';

type Task = {
    id: string;
    todo: string;
    checked: boolean;
};

const initialState = [] as Task[];

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        create: (state, action: PayloadAction<string>) => {
            const newTask = {
                id: new Date().getTime().toString(),
                todo: action.payload,
                checked: false,
            };
            state.push(newTask);
        },
        remove: (state, action: PayloadAction<string>) => {
            return state.filter((item) => item.id !== action.payload);
        },
        complate: (state, action) => {
            const index = state.findIndex((item) => item.id === action.payload.id);
            state[index].checked = action.payload.checked;
        },
    },
});

export const {create, remove, complate} = todosSlice.actions;

export const selectCount = (state: RootState) => state.todos;

export default todosSlice.reducer;
