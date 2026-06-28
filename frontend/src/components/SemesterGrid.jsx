import { Link } from 'react-router-dom';

const SemesterGrid = ({ basePath }) => {
  const semesters = [1, 2, 3, 4, 5, 6];
  return (
    <div className="grid">
      {semesters.map((s) => (
        <Link key={s} to={`${basePath}/${s}`} className="card semester-card">
          <h3>Semester {s}</h3>
          <p>View subjects &amp; materials</p>
        </Link>
      ))}
    </div>
  );
};

export default SemesterGrid;
