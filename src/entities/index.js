// ========================== user ==========================
export {
    userApi,
    userReducer, setCurrentUser, fetchUsers,
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
// ========================== schedule ==========================
export {
    scheduleApi, scheduleReducer, addSchedule, fetchSchedules, updateSchedule,
    deleteSchedule, selectSchedule, clearCurrentSchedule,
    selectSchedules, selectSchedulesError, selectSchedulesLoading, selectCurrentSchedule
} from './schedule'
// ========================== lesson ==========================

export {
    lessonsApi,
    lessonReducer, addLesson, deleteLesson, updateLesson, fetchLessons, generateLessons,
    chooseLesson, clearCurrentLesson,
    selectCurrentLesson, selectLessons, selectLessonsError, selectLessonsLoading,
    selectGenerateError, selectGeneratingLessons
} from './lesson'

// ========================== styles ==========================

export {
    stylesApi,
    styleReducer, addStyle, deleteStyle, updateStyle, fetchStyles,
    selectCurrentStyle, selectStyles, selectStylesError, selectStylesLoading,
    chooseStyle,
    clearCurrentStyle,
    archiveStyle,
    restoreStyle
} from './styles'

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

