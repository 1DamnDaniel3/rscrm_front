import { configureStore } from "@reduxjs/toolkit";
import { userReducer, leadsReducer, groupReducer, statusReducer, sourceReducer, studentReducer, clientReducer } from '../entities'
import { authReducer } from '../features'

export const store = configureStore({
    reducer: {
        users: userReducer,
        auth: authReducer,
        
        leads: leadsReducer,
        students: studentReducer,
        clients: clientReducer,
        groups: groupReducer,
        statuses: statusReducer,
        sources: sourceReducer,
    }
})