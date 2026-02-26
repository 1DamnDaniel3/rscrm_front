import AsyncSelect from "react-select/async";
import { Typography, Modal, Box } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { SearchClients, selectSearchClients } from "../../../../entities/client/model/clientSlice";
import { useState } from "react";
import { addRelation } from "../../../../entities";
import s from "./SearchClientsModal.module.css";
import { SearchStyles } from "../selectorStyles";
import { Button } from "../../../../shared";


export const SearchClientsModal = ({
    openModal,
    setOpenModal,
    handleClose,
    openRowId,
}) => {
    const dispatch = useDispatch();
    const searchClients = useSelector(selectSearchClients);
    const [selectedClient, setSelectedClient] = useState(null);

    const loadClientOptions = async (inputValue) => {
        dispatch(SearchClients(inputValue));
        return searchClients.map((c) => ({ value: c.id, label: c.name }));
    };

    return (
        <Modal
            open={openModal}
            onClose={handleClose}
            disablePortal
            slotProps={{
                backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.5)" } },
            }}
        >
            <Box className={s.ModalBox}>
                <Typography variant="h5" mb={2} sx={{ paddingTop: "20px" }}>
                    Связать с клиентом
                </Typography>

                {/* react-select/async*/}

                <AsyncSelect
                    className={s.asyncSelect}
                    cacheOptions
                    loadOptions={loadClientOptions}
                    defaultOptions
                    onChange={(option) => {
                        setSelectedClient(option);
                        setOpenModal(false);
                        if (option) {
                            dispatch(
                                addRelation({
                                    client_id: option.value,
                                    is_payer: false,
                                    relation: "не указано",
                                    student_id: openRowId,
                                }),
                            );
                        }
                    }}
                    value={selectedClient}
                    placeholder="Начните вводить имя клиента..."
                    styles={SearchStyles}
                />

                <Button className={s.closeModalBtn} onClick={handleClose}>
                    Закрыть
                </Button>
            </Box>
        </Modal>
    );
};
