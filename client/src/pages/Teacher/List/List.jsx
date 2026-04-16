import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllTeachers } from "../../../models/Teacher";

export default function List() {
  const [teachers, setTeachers] = useState();
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getAllTeachers();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setTeachers(data.payload);
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
              <h1>Učitelé</h1>
              <p className="alert alert-danger">Učitelé nebyli nalezeni.</p>
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
              <h1>Učitelé</h1>
              <p>Načítání učitelů…</p>
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
              <h1>Seznam učitelů</h1>
              <p className="subtitle">Klikni na detail učitele.</p>
            </div>
            <div className="actions">
              <Link className="btn btn-primary" to={"/createteacher"}>
                Přidat učitele
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
                    <th className="nowrap">Úvazek</th>
                    <th className="nowrap">Akce</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((t) => (
                    <tr key={t._id}>
                      <td>
                        <strong>{t.name}</strong>
                      </td>
                      <td className="nowrap">{t.age}</td>
                      <td className="nowrap">{t.contract}</td>
                      <td className="nowrap">
                        <Link className="btn" to={`/teacher/${t._id}`}>
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

