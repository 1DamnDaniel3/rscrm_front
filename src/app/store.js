import { configureStore } from "@reduxjs/toolkit";
import { userReducer, leadsReducer, groupReducer, statusReducer, sourceReducer, studentReducer } from '../entities'
import { authReducer } from '../features'

export const store = configureStore({
    reducer: {
        users: userReducer,
        auth: authReducer,
        
        leads: leadsReducer,
        students: studentReducer,
        groups: groupReducer,
        statuses: statusReducer,
        sources: sourceReducer,
    }
})