import { useDispatch, useSelector } from "react-redux";
import { Footer, IconButton, Button, EditableText, SelectShort } from "../../../shared";
import {
    addGroup, deleteGroup, fetchGroups, selectGroups,
    selectSelectedGroupId, selectUser, setSelectedGroupId,
    updateGroup
} from "../../../entities";
import React, { useEffect, useRef } from "react";
import cn from 'classnames';
import plus from '../../../shared/assets/icons/plusIcon.svg';
import s from './GroupFooter.module.css';

// Виджет, включающий кнопки групп и кнопку добавления групп. Фильтрует группы по school_id и entity_type
export const GroupFooter = ({ entity_type }) => {
    const dispatch = useDispatch();
    const groups = useSelector(selectGroups)
    const user = useSelector(selectUser)
    const selectedGroup = useSelector(selectSelectedGroupId)

    const editableRefs = useRef({});  // ref to activate focus in editable text


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
                {groups.map(group => {
                    // Создаём ref для группы, если ещё нет
                    if (!editableRefs.current[group.id]) {
                        editableRefs.current[group.id] = React.createRef();
                    }

                    return (
                        <Button
                            key={group.id}
                            className={cn(s.button, { [s.selectedButton]: group.id === selectedGroup })}
                            onClick={() => handleSelectGroup(group.id)}
                        >
                            <EditableText
                                ref={editableRefs.current[group.id]} // прокидываем ref
                                value={group.name}
                                onSave={(newName) => {
                                    dispatch(updateGroup({ group_id: group.id, data: { name: newName } }));
                                }}
                                className={s.buttonText}
                            />
                            <SelectShort
                                options={[
                                    { label: "Удалить", value: "delete" },
                                    { label: "Переименовать", value: "rename" }
                                ]}
                                value={null}
                                onChange={(val) => {
                                    switch (val) {
                                        case "delete":
                                            dispatch(deleteGroup(group.id));
                                            break;
                                        case "rename":
                                            editableRefs.current[group.id]?.current?.focusEditable();
                                            break;
                                    }
                                }}
                            />
                        </Button>
                    );
                })}

                <IconButton
                    icon={plus}
                    onClick={() => handleAddGroup(defaultAddData)}
                    className={`${s.plusBtn} ${groups.length === 0 ? s.attention : ''}`}
                />
            </Footer>
        </div>
    );
}