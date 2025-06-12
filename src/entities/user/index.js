export {
    default as userReducer,
    selectSchoolUsers, selectUser, selectUsersLoading, selectUsersError, 
    setCurrentUser, fetchUsers,
    registerAdminSchool
} from './model/userSlice'
export { userApi } from './api/userApi'