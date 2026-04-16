import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllClasses } from "../../../models/Classes";

export default function List() {
  const [classes, setClasses] = useState();
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getAllClasses();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setClasses(data.payload);
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
              <h1>Třídy</h1>
              <p className="alert alert-danger">Třídy nebyly nalezeny.</p>
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
              <h1>Třídy</h1>
              <p>Načítání tříd…</p>
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
              <h1>Seznam tříd</h1>
              <p className="subtitle">Klikni na detail třídy.</p>
            </div>
            <div className="actions">
              <Link className="btn btn-primary" to={"/createclass"}>
                Přidat třídu
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
                    <th>Třída</th>
                    <th className="nowrap">Učebna</th>
                    <th className="nowrap">Akce</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((c) => (
                    <tr key={c._id}>
                      <td>
                        <strong>{`${c.year}.${c.code}`}</strong>
                      </td>
                      <td className="nowrap">
                        {c.hasClassroom ? c.classroomCode : "—"}
                      </td>
                      <td className="nowrap">
                        <Link className="btn" to={`/class/${c._id}`}>
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
