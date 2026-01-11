import { useDispatch, useSelector } from "react-redux";
import { Footer, IconButton, Button, EditableText, SelectShort } from "../../../shared";
import {
    addGroup, deleteGroup, fetchGroups, selectGroups,
    selectSelectedGroupId, selectUser, setSelectedGroupId,
    updateGroup
} from "../../../entities";
import { useEffect } from "react";
import cn from 'classnames';
import plus from '../../../shared/assets/icons/plusIcon.svg';
import s from './GroupFooter.module.css';

// Виджет, включающий кнопки групп и кнопку добавления групп. Фильтрует группы по school_id и entity_type
export const GroupFooter = ({ entity_type }) => {
    const dispatch = useDispatch();
    const groups = useSelector(selectGroups)
    const user = useSelector(selectUser)
    const selectedGroup = useSelector(selectSelectedGroupId)

    const defaultAddData = {
        name: '',
        entity_type,
        school_id: user.school_id,
    }

    const handleSelectGroup = (group_id) => { dispatch(setSelectedGroupId(group_id)) };
    const handleAddGroup = (data) => { dispatch(addGroup(data)) }; //onClick={handleAddGroup(defaultAddData)}

    
    return (

        
        <div className={s.groupFooter}>

            <Footer>
                {groups.map(group => (
                    <Button
                        key={group.id}
                        className={cn(s.button, { [s.selectedButton]: group.id === selectedGroup })}
                        onClick={() => handleSelectGroup(group.id)}
                    >
                        <EditableText
                            value={group.name}
                            onSave={(newName) => {
                                dispatch(updateGroup({ group_id: group.id, data: { name: newName } }));
                            }}
                            className={s.buttonText}
                        />
                        <SelectShort 
                        options={[{label: "Удалить", value: group.id}]}
                        value={null}
                        onChange={(val) => {dispatch(deleteGroup(val))}}
                        />

                    </Button>
                ))}

                <IconButton icon={plus} onClick={() => handleAddGroup(defaultAddData)} className={s.plusBtn} />

            </Footer>


        </div>
    )
}