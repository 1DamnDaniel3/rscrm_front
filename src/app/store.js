import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from '../entities'
import {authReducer} from '../features'

export const store = configureStore({
    reducer:{
        users: userReducer,
        auth: authReducer,
    }
})