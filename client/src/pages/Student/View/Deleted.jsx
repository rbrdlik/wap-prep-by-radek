import { Link, useParams } from "react-router-dom";

export default function Deleted() {
  const { id } = useParams();

  return (
    <>
      <div className="page">
        <div className="container">
          <div className="card">
            <h1>Student byl smazán</h1>
            <p className="subtitle">ID: {id}</p>
            <div className="actions">
              <Link className="btn" to={"/students"}>
                Seznam studentů
              </Link>
              <Link className="btn btn-ghost" to={"/"}>
                Domů
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
