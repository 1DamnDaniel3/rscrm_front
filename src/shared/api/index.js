import {
    userApi, leadsApi, schoolsApi,
    statusApi, groupApi, sourceApi,
    studentApi, clientApi, scheduleApi,
    lessonsApi, stylesApi
} from '../../entities';


export const APIs = {
    user: userApi,
    //lead
    lead: leadsApi,
    source: sourceApi,
    status: statusApi,
    //student
    student: studentApi,
    //client
    client: clientApi,

    group: groupApi,
    schedule: scheduleApi,
    lesson: lessonsApi,
    style: stylesApi,
    //school
    schools: schoolsApi,

};


export { api } from './base';