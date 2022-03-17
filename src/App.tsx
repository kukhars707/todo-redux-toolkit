import React, {useState} from 'react';
import css from './index.scss';
import {useAppSelector, useAppDispatch} from './hooks';
import {create, remove, complate} from './store/todosReducer';

const App: React.FC = (): React.ReactElement => {
    const [todo, setTodo] = useState(null);
    const task = useAppSelector((state) => state.todos);
    const dispatch = useAppDispatch();
    return (
        <div className={css.app}>
            <div>
                <input type="text" onChange={(e) => setTodo(e.target.value)} />
            </div>
            <div>
                <ul>
                    {task.map((item) => (
                        <li key={item.id}>
                            {item.todo}
                            <button onClick={() => dispatch(remove(item.id))}>delete</button>
                            <input
                                type="checkbox"
                                onChange={(e) => dispatch(complate({id: item.id, checked: e.target.checked}))}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <button onClick={() => dispatch(create(todo))}>add</button>
            </div>
        </div>
    );
};

export default App;
