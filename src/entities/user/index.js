export {
    default as userReducer,
    selectSchoolUsers, selectUser, selectUsersLoading, selectUsersError, 
    setCurrentUser,
    registerAdminSchool
} from './model/userSlice'
export { userApi } from './api/userApi'