import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Box,
  Collapse,
  IconButton as IcBtn,
  Checkbox,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Select from "react-select";
import upArrow from "../../../shared/assets/images/upArrow.svg";
import downArrow from "../../../shared/assets/images/downArrow.svg";
import icon from "../../../shared/assets/icons/garbage.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  ChangeRelation,
  deleteRelation,
  deleteStudent,
  selectGroups,
  selectStudentClientsByStudent,
  selectStudents,
  studentClients,
  updateStudent,
} from "../../../entities";
import { Fragment, useState } from "react";
import {
  ButtonLink,
  EditableText,
  Instruction,
  IconButton,
} from "../../../shared";
import { tableSelectStyles } from "./selectorStyles";
import { SearchClientsModal } from "./SubComponents/SearchClientsModal";
import s from "./StudentsTable.module.css";


export const StudentsTable = () => {
  const dispatch = useDispatch();
  const students = useSelector(selectStudents);
  const groups = useSelector(selectGroups);

  const instructionShow =
    groups.length === 0 || (groups.length > 0 && students.length === 0);

  const skillLevelOptions = [
    { value: "beginner", label: "beginner" },
    { value: "middle", label: "middle" },
    { value: "pro", label: "pro" },
  ];
  const [openRowId, setOpenRowId] = useState(null);
  const studClients = useSelector((state) =>
    selectStudentClientsByStudent(state, openRowId),
  );

  const toggleRow = (id) => {
    dispatch(studentClients(id));
    setOpenRowId((prev) => (prev === id ? null : id));
  };

  // MODAL
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  // =============================== SEARCH



  return (
    <div>
      <TableContainer component={Paper} className={s.tableContainer}>
        <Table>
          <TableHead className={s.tablehead}>
            <TableRow>
              <TableCell className={s.cell}>#</TableCell>
              <TableCell className={s.cell}>Имя</TableCell>
              <TableCell className={s.cell}>Уровень навыков</TableCell>
              <TableCell className={s.cell}>Дата рождения</TableCell>
              <TableCell className={s.cell}>Возраст</TableCell>
              <TableCell className={s.cell}>Контакт</TableCell>
              <TableCell className={s.cell}>Удалить</TableCell>
              <TableCell className={s.cell}>Подробнее</TableCell>
            </TableRow>
          </TableHead>

          {/* ====================== BODY ====================== */}

          <TableBody>
            {students.map((student, idx) => {
              return (
                <Fragment key={student.id}>
                  <TableRow key={student.id} className={s.infoRow}>
                    <TableCell className={s.cell}>{idx + 1}</TableCell>
                    <TableCell className={s.cell}>
                      <EditableText
                        value={student.name}
                        className={s.NameInput}
                        clicksToEdit={1}
                        onSave={(newVal) =>
                          dispatch(
                            updateStudent({
                              id: student.id,
                              data: { name: newVal },
                            }),
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className={s.cell}>
                      <Select
                        value={skillLevelOptions.find(
                          (opt) => opt.value === student.skill_level,
                        )}
                        onChange={(selected) => {
                          dispatch(
                            updateStudent({
                              id: student.id,
                              data: { skill_level: selected.value },
                            }),
                          );
                        }}
                        options={skillLevelOptions}
                        styles={tableSelectStyles}
                        menuPosition="fixed"
                        isSearchable={false}
                      />
                    </TableCell>
                    <TableCell className={s.cell}>
                      {student.birthdate}
                    </TableCell>
                    <TableCell className={s.cell}>вычислить</TableCell>
                    <TableCell className={s.cell}>
                      <EditableText
                        value={student.contact}
                        className={s.NameInput}
                        clicksToEdit={1}
                        onSave={(newVal) =>
                          dispatch(
                            updateStudent({
                              id: student.id,
                              data: { contact: newVal },
                            }),
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className={s.cell}>
                      <IconButton
                        icon={icon}
                        title="Удалить"
                        type="button"
                        onClick={() => dispatch(deleteStudent(student.id))}
                      />
                    </TableCell>
                    <TableCell padding="checkbox">
                      <IcBtn
                        size="small"
                        sx={{ color: "white" }}
                        onClick={() => toggleRow(student.id)}
                      >
                        {openRowId === student.id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IcBtn>
                    </TableCell>
                  </TableRow>

                  {/* ===== РАСКРЫВАЕМАЯ СТРОКА ===== */}

                  <TableRow>
                    <TableCell
                      colSpan={8}
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      className={s.expandableRow}
                    >
                      <Collapse
                        in={openRowId === student.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 2 }}>
                          {studClients.map((client, idx) => (
                            <div
                              key={client.id}
                              className={s.ClientInfoWrapper}
                            >
                              <span className={s.clientSpan}>
                                Клиент {idx + 1}
                              </span>
                              <span className={s.clientSpan}>
                                Плательщик?
                                <Checkbox
                                  checked={Boolean(client.is_payer)}
                                  onChange={(e) => {
                                    dispatch(
                                      ChangeRelation({
                                        id: client.relation_id,
                                        data: { is_payer: e.target.checked },
                                      }),
                                    );
                                  }}
                                  size="small"
                                  sx={{
                                    color: "var(--color-border)",
                                    "&.Mui-checked": {
                                      color: "var(--color-accent)",
                                    },
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                    },
                                  }}
                                />
                              </span>
                              <span className={s.clientSpan}>
                                Имя: {client.name}
                              </span>
                              <span className={s.clientSpan}>
                                Отношение: {client.relation}
                              </span>
                              <span className={s.clientSpan}>
                                Телефон: {client.phone}
                              </span>
                              <span className={s.clientSpan}>
                                Контакт: {client.contact}
                              </span>
                              <IconButton
                                className={s.deleteRelationBtn}
                                icon={icon}
                                title="Удалить"
                                type="button"
                                onClick={() =>
                                  dispatch(
                                    deleteRelation({
                                      relation_id: client.relation_id,
                                      student_id: student.id,
                                    }),
                                  )
                                }
                              />
                            </div>
                          ))}
                          <ButtonLink
                            text={"+ Добавить связь"}
                            className={s.addRelationBtn}
                            onClick={handleOpen}
                          />
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <SearchClientsModal
        openModal={openModal}
        handleClose={handleClose}
        setOpenModal={setOpenModal}
        openRowId={openRowId}
      />

      {/* ======================================= INSTRUCTION */}
      {instructionShow ? (
        <div className={s.instructionContainer}>
          {groups.length === 0 ? (
            <div className={s.instruction}>
              <Instruction text={"Добавьте группы"} />
              <img className={s.DownArrow} src={downArrow}></img>
            </div>
          ) : null}
          {groups.length > 0 && students.length === 0 ? (
            <div className={s.instruction}>
              <Instruction text={"Добавьте учеников"} />
              <img className={s.UpArrow} src={upArrow}></img>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
