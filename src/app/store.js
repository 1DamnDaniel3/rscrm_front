import { configureStore } from "@reduxjs/toolkit";
import {
    userReducer, leadsReducer, groupReducer,
    statusReducer, sourceReducer, studentReducer,
    clientReducer, scheduleReducer, lessonReducer,
    styleReducer
} from '../entities'
import { authReducer, modalReducer } from '../features'

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

        modal: modalReducer,
        schedule: scheduleReducer,
        lesson: lessonReducer,
        style: styleReducer,
    }
})