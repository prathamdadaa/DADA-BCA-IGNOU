const About = () => {
  return (
    <div className="page about-page">
      <h1>About This Project</h1>
      <p>
        IGNOU BCA Student Portal is a one-stop platform built for IGNOU BCA students to
        access semester-wise notes, assignments, previous year paper links, quizzes,
        a CGPA calculator, and an AI-powered study assistant.
      </p>

      <div className="card about-card">
        <h3>Owner</h3>
        <p><strong>Pratham Dada</strong></p>
        <p>BCA Student (IGNOU)</p>
        <p>Dhanbad, Jharkhand</p>
      </div>

      <h3>Disclaimer</h3>
      <p className="muted">
        Previous year paper links point to official IGNOU resources only. This is an
        independent student project and is not officially affiliated with IGNOU.
      </p>
    </div>
  );
};

export default About;
