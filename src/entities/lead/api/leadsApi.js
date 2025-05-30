import {api} from '../../../shared'


export const leadsApi = {
    getSchoolLeads: async (data) => api.post('./leads/getAllWhere', data),
    deleteLead: async (id) => api.delete(`/leads/${id}`),
    updateLead: async (data, id) => api.put(`/leads/${id}`, data),
}