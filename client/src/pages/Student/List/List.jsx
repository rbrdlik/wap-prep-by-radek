import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllStudents } from "../../../models/Student";

export default function List() {
  const [students, setStudents] = useState();
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getAllStudents();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setStudents(data.payload);
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
              <h1>Studenti</h1>
              <p className="alert alert-danger">Studenti nebyli nalezeni.</p>
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
              <h1>Studenti</h1>
              <p>Načítání studentů…</p>
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
              <h1>Seznam studentů</h1>
              <p className="subtitle">Klikni na detail studenta.</p>
            </div>
            <div className="actions">
              <Link className="btn btn-primary" to={"/createstudent"}>
                Přidat studenta
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
                    <th>Jméno</th>
                    <th className="nowrap">Věk</th>
                    <th className="nowrap">Průměr</th>
                    <th className="nowrap">Akce</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s._id}>
                      <td>
                        <strong>{s.name}</strong>
                      </td>
                      <td className="nowrap">{s.age}</td>
                      <td className="nowrap">{s.gradeAverage}</td>
                      <td className="nowrap">
                        <Link className="btn" to={`/student/${s._id}`}>
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
