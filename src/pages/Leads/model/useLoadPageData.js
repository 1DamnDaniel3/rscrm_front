import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, fetchProfiles, fetchSources, fetchStatuses, fetchUsers, groupedLeads, selectGroups, selectSelectedGroupId, selectUser } from "../../../entities";



// LoadPageData используется для того, чтобы выполнить подгрузку всех данных для страницы.
export const useLoadPageData = ({entity_type}) =>{
    const dispatch = useDispatch();
    const group_id = useSelector(selectSelectedGroupId)
    const user = useSelector(selectUser);

    const newLeadData = {
        "group": {
            "group_id": group_id,
            "school_id": user.school_id,
        },
        "lead": {
            "name": "New",
            "source_id": null,
            "status_id": null,
            "created_by": user.id,
            "school_id": user.school_id,
        }

    }

    // Сначала загрузить группы
    useEffect(() => {
        if(user?.school_id){
            dispatch(fetchGroups({ school_id: user.school_id, entity_type }))
        }   
    }, [dispatch, user.school_id, entity_type]);

    // затем лидов и остальные сущности
    useEffect(() => {
        if(!user?.school_id) return;
        if(!group_id) return; 

        dispatch(groupedLeads({school_id: user.school_id, group_id: group_id}))
        dispatch(fetchStatuses({type: "lead", school_id: user.school_id}))
        dispatch(fetchUsers({school_id: user.school_id}))
        dispatch(fetchProfiles({school_id: user.school_id}))
        dispatch(fetchSources())
    }, [dispatch, user.school_id, entity_type, group_id]);

    return { newLeadData }
}