import { userApi, leadsApi, schoolsApi, statusApi, groupApi, sourceApi, studentApi } from '../../entities';


export const APIs = {
    user: userApi,
    //lead
    lead: leadsApi,
    source: sourceApi,
    status: statusApi,
    //student
    student: studentApi,

    group: groupApi,
    //school
    schools: schoolsApi,


};


export { api } from './base';