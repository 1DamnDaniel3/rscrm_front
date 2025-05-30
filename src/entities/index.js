// ========================== user ==========================
export {
    userApi,
    userReducer, setCurrentUser,
    selectSchoolUsers, selectUser, selectUsersLoading, selectUsersError,
    registerAdminSchool,
} from './user'
// ========================== lead ==========================
export {
    leadsReducer, fetchLeads, deleteLead, updateLead,
    selectLeads, selectLoadLeads, selectErrorLeads,
    leadsApi,
} from './lead'
// ========================== school ==========================
export { SchoolCard, schoolsApi } from './school'
// ========================== status ==========================
export {
    statusReducer, selectErrorStatuses, selectLoadStatuses, selectStatuses,
    statusApi
} from './status'
// ========================== group ==========================
export {
    groupReducer,
    selectGroups, selectGroupsError, selectGroupsLoading,
    fetchGroups, deleteGroup, updateGroup, groupApi
} from './group'

