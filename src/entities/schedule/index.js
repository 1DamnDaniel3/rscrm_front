export {
    default as scheduleReducer, addSchedule, fetchSchedules, updateSchedule, deleteSchedule,
    selectSchedules, selectSchedulesError, selectSchedulesLoading
} from './model/scheduleSlice'
export { scheduleApi } from './api/scheduleApi'