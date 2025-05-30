import { configureStore } from "@reduxjs/toolkit";
import { userReducer, leadsReducer, groupReducer, statusReducer } from '../entities'
import { authReducer } from '../features'

export const store = configureStore({
    reducer: {
        users: userReducer,
        auth: authReducer,
        
        leads: leadsReducer,
        groups: groupReducer,
        statuses: statusReducer,
    }
})