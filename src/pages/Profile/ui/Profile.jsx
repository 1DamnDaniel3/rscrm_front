import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectUser } from "../../../entities";
import { Navigation } from "../../../widgets";
import { APIs } from "../../../shared";
import s from "./Profile.module.css";

export const Profile = () => {
  const user = useSelector(selectUser);
  const [school, setSchool] = useState(null);

  useEffect(() => {
    const fetchSchool = async () => {
      const schoolId = user.school_id === "null" ? null : user.school_id;
      if (schoolId) {
        const response = await APIs.schools.getOne(schoolId);
        setSchool(response.data);
      }
    };
    fetchSchool();
  }, [user.school_id]);

  return (
    <div className={s.wrapper}>
      <Navigation />
      <div className={s.content}>
        <h1 className={s.heading}>Профиль</h1>

        <div className={s.section}>
          <h2 className={s["section-title"]}>Аккаунт</h2>
          <div className={s["info-row"]}>
            <div className={s.label}>Email:</div>
            <div className={s.value}>{user.email}</div>
          </div>
          <div className={s["info-row"]}>
            <div className={s.label}>Роль:</div>
            <div className={s.value}>{user.role}</div>
          </div>
        </div>

        {school && (
          <div className={s.section}>
            <h2 className={s["section-title"]}>Школа</h2>
            <div className={s["info-row"]}>
              <div className={s.label}>Название:</div>
              <div className={s.value}>{school.Name}</div>
            </div>
            <div className={s["info-row"]}>
              <div className={s.label}>Город:</div>
              <div className={s.value}>{school.City}</div>
            </div>
            <div className={s["info-row"]}>
              <div className={s.label}>Email школы:</div>
              <div className={s.value}>{school.Email}</div>
            </div>
            <div className={s["info-row"]}>
              <div className={s.label}>Телефон:</div>
              <div className={s.value}>{school.Phone}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
