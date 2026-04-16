import { useParams, Link } from "react-router-dom";

export default function Created() {
  const { id } = useParams();

  return (
    <>
      <div className="page">
        <div className="container">
          <div className="card">
            <h1>Třída byla vytvořena</h1>
            <p className="subtitle">ID: {id}</p>
            <div className="actions">
              <Link className="btn btn-primary" to={`/class/${id}`}>
                Otevřít detail třídy
              </Link>
              <Link className="btn" to={`/classes`}>
                Seznam tříd
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
