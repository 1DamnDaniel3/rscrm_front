export {
    default as statusReducer,
    fetchStatuses, addStatus, updateStatus, deleteStatus,
    selectErrorStatuses, selectLoadStatuses, selectStatuses, selectStatusesByid
} from './model/statusSlice'
export { statusApi } from './api/statusApi'