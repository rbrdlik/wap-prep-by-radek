import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllSubjects } from "../../../models/Subject";

export default function List() {
  const [subjects, setSubjects] = useState();
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getAllSubjects();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setSubjects(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <div className="page">
          <div className="container">
            <div className="card">
              <h1>Předměty</h1>
              <p className="alert alert-danger">Předměty nebyly nalezeny.</p>
              <div className="actions">
                <Link className="btn" to={"/"}>
                  Zpět na hlavní stránku
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!loaded) {
    return (
      <>
        <div className="page">
          <div className="container">
            <div className="card">
              <h1>Předměty</h1>
              <p>Načítání předmětů…</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="page">
        <div className="container">
          <div className="header">
            <div>
              <h1>Seznam předmětů</h1>
              <p className="subtitle">Klikni na detail předmětu.</p>
            </div>
            <div className="actions">
              <Link className="btn btn-primary" to={"/createsubject"}>
                Přidat předmět
              </Link>
              <Link className="btn btn-ghost" to={"/"}>
                Domů
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Název</th>
                    <th className="nowrap">Kód</th>
                    <th className="nowrap">Ročník</th>
                    <th className="nowrap">Min. hodin/týden</th>
                    <th className="nowrap">Akce</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((s) => (
                    <tr key={s._id}>
                      <td>
                        <strong>{s.name}</strong>
                      </td>
                      <td className="nowrap">{s.code}</td>
                      <td className="nowrap">{s.year}</td>
                      <td className="nowrap">{s.minimumHoursPerWeek}</td>
                      <td className="nowrap">
                        <Link className="btn" to={`/subject/${s._id}`}>
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
