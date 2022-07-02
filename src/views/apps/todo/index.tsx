import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
// ** Todo App Components
import Tasks from './Tasks';
import Sidebar from './Sidebar';
import TaskSidebar from './TaskSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, updateTask, selectTask, addTask, deleteTask, reOrderTasks } from './store';
import '../../../@core/scss/react/apps/app-todo.scss';
import { RootState } from '../../../redux/reducers/RootReducer';
import {IFilter} from '../../../domains/interfaces/IFilter';

const TODO = () => {
  const [sort, setSort] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [mainSidebar, setMainSidebar] = useState<boolean>(false);
  const [openTaskSidebar, setOpenTaskSidebar] = useState<boolean>(false);
  const dispatch = useDispatch<any>();
  const store = useSelector((state: RootState) => state.todo);

  // ** URL Params
  const paramsURL = useParams();
  const params: IFilter = {
    filter: paramsURL.filter || '',
    q: query || '',
    sortBy: sort || '',
    tag: paramsURL.tag || '',
  };

  // ** Function to handle Left sidebar & Task sidebar
  const handleMainSidebar = () => setMainSidebar(!mainSidebar);
  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar);

  // ** Get Tasks on mount & based on dependency change
  useEffect(() => {
    dispatch(
      getTasks({
        filter: paramsURL.filter || '',
        q: query || '',
        sortBy: sort || '',
        tag: paramsURL.tag || '',
      }),
    );
  }, [store.tasks.length, paramsURL.filter, paramsURL.tag, query, sort]);

  return (
    <Fragment>
      <Sidebar
        store={store}
        params={params}
        getTasks={getTasks}
        dispatch={dispatch}
        mainSidebar={mainSidebar}
        urlFilter={paramsURL.filter}
        setMainSidebar={setMainSidebar}
        handleTaskSidebar={handleTaskSidebar}
      />
      <div className='content-right'>
        <div className='content-wrapper'>
          <div className='content-body'>
            <div
              className={classnames('body-content-overlay', {
                show: mainSidebar,
              })}
              onClick={handleMainSidebar}
            ></div>

            {store ?
              (
                <Tasks
                  store={store}
                  tasks={store.tasks}
                  sort={sort}
                  query={query}
                  params={params}
                  setSort={setSort}
                  setQuery={setQuery}
                  dispatch={dispatch}
                  getTasks={getTasks}
                  paramsURL={paramsURL}
                  updateTask={updateTask}
                  selectTask={selectTask}
                  reOrderTasks={reOrderTasks}
                  handleMainSidebar={handleMainSidebar}
                  handleTaskSidebar={handleTaskSidebar}
                />
              ) :
              null}

            <TaskSidebar
              store={store}
              params={params}
              addTask={addTask}
              dispatch={dispatch}
              open={openTaskSidebar}
              updateTask={updateTask}
              selectTask={selectTask}
              deleteTask={deleteTask}
              handleTaskSidebar={handleTaskSidebar}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TODO;
