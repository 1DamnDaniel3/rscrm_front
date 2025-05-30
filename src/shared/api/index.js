import { userApi, leadsApi, schoolsApi, statusApi, groupApi } from '../../entities';


export const APIs = {
    user: userApi,
    lead: leadsApi,
    schools: schoolsApi,
    status: statusApi,
    group: groupApi
    
};


export { api } from './base';