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
// ========================== student ==========================
export {
    studentApi,
    studentReducer, fetchStudents, addStudent, updateStudent, deleteStudent,
    selectStudents, selectLoadStudents, selectErrorStudents,
} from './students'
// ========================== client ==========================

export {
    clientApi,
    clientReducer, addClient, updateClient, deleteClient, fetchClients,
    selectClients, selectClientsError, selectClientsLoading,
} from './client'
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
    selectGroups, selectGroupsError, selectGroupsLoading, selectSelectedGroupId,
    fetchGroups, deleteGroup, updateGroup, groupApi, addGroup, setSelectedGroupId
} from './group'


export {
    scheduleApi, scheduleReducer, addSchedule, fetchSchedules, updateSchedule, deleteSchedule,
    selectSchedules, selectSchedulesError, selectSchedulesLoading
} from './schedule'