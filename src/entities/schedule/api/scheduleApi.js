import { api } from '../../../shared/api/base'

export const scheduleApi = {
    addSchedule: async (data) => api.post('/schedules/registration', data),
    // getAllSchedules: async () => api.get('/schedules'),
    getAllSchedulesWhere: async (data) => api.post('/schedules/getAllWhere', data),
    getScheduleById: async (id) => api.get(`/schedules/${id}`),
    updateSchedule: async (id, data) => api.put(`/schedules/${id}`, data),
    deleteSchedule: async (id) => api.delete(`/schedules/${id}`)
}