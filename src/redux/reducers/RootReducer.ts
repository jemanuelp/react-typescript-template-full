import layout from '../layout';
import navbar from '../navbar';
import auth from '../authentication';
import todo from '../../views/apps/todo/store';
import chat from '../../views/apps/chat/store';
import users from '../../views/apps/user/store';
import email from '../../../src/views/apps/email/store';
import kanban from '../../../src/views/apps/kanban/store';
import invoice from '../../views/apps/invoice/store';
import calendar from '../../../src/views/apps/calendar/store';
import ecommerce from '../../../src/views/apps/ecommerce/store';
import dataTables from '../../../src/views/tables/data-tables/store';
import permissions from '../../views/apps/roles-permissions/store';
import {combineReducers} from 'redux';

const RootReducer = combineReducers({
  auth,
  todo,
  chat,
  email,
  users,
  kanban,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  permissions,
});

export default RootReducer;

export type RootState = ReturnType<typeof RootReducer>