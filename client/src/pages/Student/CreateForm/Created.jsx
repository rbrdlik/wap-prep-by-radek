import { useParams, Link } from "react-router-dom";

export default function Created() {
  const { id } = useParams();

  return (
    <>
      <div className="page">
        <div className="container">
          <div className="card">
            <h1>Student byl vytvořen</h1>
            <p className="subtitle">ID: {id}</p>
            <div className="actions">
              <Link className="btn btn-primary" to={`/student/${id}`}>
                Otevřít detail studenta
              </Link>
              <Link className="btn" to={`/students`}>
                Seznam studentů
              </Link>
              <Link className="btn btn-ghost" to={`/`}>
                Domů
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
