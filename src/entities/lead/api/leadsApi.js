import {api} from '../../../shared'


export const leadsApi = {
    getAllLeadsWhere: async (data) => api.post('/leads/getallwhere', data),
    addSchoolLead: async(data) => api.post('/leads/create', data),
    deleteLead: async (id) => api.delete(`/leads/delete/${id}`),
    updateLead: async (id, data) => api.patch(`/leads/update/${id}`, data),
}