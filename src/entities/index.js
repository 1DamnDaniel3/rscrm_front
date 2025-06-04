// ========================== user ==========================
export {
    userApi,
    userReducer, setCurrentUser,
    selectSchoolUsers, selectUser, selectUsersLoading, selectUsersError,
    registerAdminSchool,
} from './user'
// ========================== lead ==========================
export {
    leadsReducer, fetchLeads, deleteLead, updateLead, addLead,
    selectLeads, selectLoadLeads, selectErrorLeads,
    leadsApi,
} from './lead'
// ========================== school ==========================
export { SchoolCard, schoolsApi } from './school'
// ========================== status ==========================
export {
    fetchStatuses, addStatus, updateStatus, deleteStatus,
    statusReducer, selectErrorStatuses, selectLoadStatuses, selectStatuses,
    statusApi
} from './status'

// ========================== source ==========================

export {
    sourceApi,
    sourceReducer,
    selectSources, selectSourcesLoading, selectSourcesError,
    fetchSources, createSource, updateSource, deleteSource,
} from './source'
// ========================== group ==========================
export {
    groupReducer,
    selectGroups, selectGroupsError, selectGroupsLoading,
    fetchGroups, deleteGroup, updateGroup, groupApi
} from './group'

