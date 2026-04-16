import { Link, useParams } from "react-router-dom";

export default function Deleted() {
  const { id } = useParams();

  return (
    <>
      <div className="page">
        <div className="container">
          <div className="card">
            <h1>Třída byla smazána</h1>
            <p className="subtitle">ID: {id}</p>
            <div className="actions">
              <Link className="btn" to={"/classes"}>
                Seznam tříd
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
