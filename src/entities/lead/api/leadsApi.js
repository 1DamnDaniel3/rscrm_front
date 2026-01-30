import {api} from '../../../shared'


export const leadsApi = {
    getAllLeadsWhere: async (data) => api.post('/leads/getallwhere', data),
    addLeadWithGroup: async(data) => api.post('/leads/createandgroup', data),
    deleteLead: async (id) => api.delete(`/leads/delete/${id}`),
    updateLead: async (id, data) => api.patch(`/leads/update/${id}`, data),

    getGroupedLeads: async(data) => api.post('leads/groupedleads', data)
}