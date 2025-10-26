import { api } from '../../../shared/api/base'

export const scheduleApi = {
    addSchedule: async (data) => api.post('/schedules/create', data),
    // getAllSchedules: async () => api.get('/schedules'),
    getAllSchedulesWhere: async (data) => api.post('/schedules/getallwhere', data),
    getScheduleById: async (id) => api.get(`/schedules/getone/${id}`),
    updateSchedule: async (id, data) => api.patch(`/schedules/update/${id}`, data),
    deleteSchedule: async (id) => api.delete(`/schedules/delete/${id}`)
}