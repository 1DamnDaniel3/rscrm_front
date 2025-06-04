import {api} from '../../../shared'


export const leadsApi = {
    getSchoolLeads: async (data) => api.post('/leads/getAllWhere', data),
    addSchoolLead: async(data) => api.post('/leads/registration', data),
    deleteLead: async (id) => api.delete(`/leads/${id}`),
    updateLead: async (id, data) => api.put(`/leads/${id}`, data),
}