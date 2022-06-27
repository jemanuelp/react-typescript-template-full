import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import {RegisterResponse} from '../../domains/classes/RegisterResponse';

const registerResponse = new RegisterResponse();
// ** Create Context
export const AbilityContext = createContext(registerResponse);

// ** Init Can Context
export const Can = createContextualCan(AbilityContext.Consumer);
