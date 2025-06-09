export {
    default as groupReducer,
    selectGroups, selectGroupsError, selectGroupsLoading, selectSelectedGroupId,
    fetchGroups, deleteGroup, updateGroup, addGroup, setSelectedGroupId,
} from './model/gropSlice'
export { groupApi } from './api/groupApi'