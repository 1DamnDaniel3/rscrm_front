import { useEffect, useState } from "react";
import { APIs } from "../../../../shared";

export const UseLoadSchools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    APIs.schools.loadAllSchools()
      .then(response => {
        setSchools(response.data);
      });
  }, []);

  const deleteSchool = async (school_id) => {
    try {
      await APIs.schools.deleteSchool(school_id);
      // Обновляем локальный стейт, исключая удалённую школу
      setSchools(prev => prev.filter(school => school.id !== school_id));
    } catch (error) {
      console.error("Ошибка при удалении школы:", error);
      // Можно дополнительно вернуть ошибку или показать уведомление
    }
  };

  return { schools, deleteSchool };
};
