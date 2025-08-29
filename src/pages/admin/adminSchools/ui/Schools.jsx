// AdminSchools.jsx
import { Loader } from '../../../../shared';
import { Navigation } from '../../../../widgets';
import { SchoolCard } from '../../../../entities';
import { UseLoadSchools } from '../model/useSchoolsPage';
import { HeroBlock } from '../../../../shared';
import s from './Schools.module.css';

export const AdminSchools = () => {
  const { schools, deleteSchool } = UseLoadSchools();

  if (!Array.isArray(schools)) {
    return <Loader className={s.loader} />;
  }

  return (
    <div className={s.schoolsPage}>
      <Navigation />
      <HeroBlock heroTitle={"Schools"}/>
      <div className={s.container}>
        {schools.map((school) => (
          <SchoolCard
            key={school.id}
            school={school}
            onClick={() => deleteSchool(school.id)}
          />
        ))}
      </div>
    </div>
  );
};
