export {
    default as statusReducer,
    fetchStatuses, addStatus, updateStatus, deleteStatus,
    selectErrorStatuses, selectLoadStatuses, selectStatuses
} from './model/statusSlice'
export { statusApi } from './api/statusApi'