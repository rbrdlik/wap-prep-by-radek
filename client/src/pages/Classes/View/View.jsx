import { Link, useParams, useNavigate } from "react-router-dom";
import { getClassById, deleteClass, getAllStudentNamesInClass } from "../../../models/Classes";
import { useEffect, useState } from "react";

export default function View() {
  const { id } = useParams();
  const [classes, setClasses] = useState();
  const [loaded, setLoaded] = useState();
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const [studentNames, setStudentNames] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getClassById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setClasses(data.payload);
      await loadStudentNames(id);
      setLoaded(true);
    }
  }

  const loadStudentNames = async (classId) => {
    const data = await getAllStudentNamesInClass(classId);
    if (data.status === 200) {
      const names = (data.payload || [])
        .map((s) => (typeof s === "string" ? s : s?.name))
        .filter(Boolean);
      setStudentNames(names);
      return;
    }
    setStudentNames([]);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (formData == classes.year) {
      const result = await deleteClass(id);
      if (result.status === 200) {
        redirect(id);
      } else {
        setInfo(result.msg);
      }
    } else {
      setInfo("Nesprávně zadaný ročník třídy");
    }
  }

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const redirect = (id) => {
    return navigate(`/deletedclass/${id}`);
  }


  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <div className="page">
          <div className="container">
            <div className="card">
              <h1>Třída nenalezena</h1>
              <p className="alert alert-danger">
                Třída s tímto ID neexistuje nebo byla smazána.
              </p>
              <div className="actions">
                <Link className="btn" to={"/classes"}>
                  Zpět na seznam tříd
                </Link>
                <Link className="btn btn-ghost" to={"/"}>
                  Domů
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!loaded) {
    return (
      <>
        <div className="page">
          <div className="container">
            <div className="card">
              <h1>Detail třídy</h1>
              <p>Načítání třídy…</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="page">
        <div className="container">
          <div className="header">
            <div>
              <h1>Detail třídy {classes.year}.{classes.code}</h1>
              <p className="subtitle">ID: {id}</p>
            </div>
            <div className="actions">
              <Link className="btn" to={`/updateclass/${id}`}>
                Upravit
              </Link>
              <Link className="btn btn-ghost" to={"/classes"}>
                Seznam tříd
              </Link>
            </div>
          </div>

          <div className="grid">
            <div className="card col-12 col-7">
              <h1>Informace</h1>
              <div className="table-wrap">
                <table>
                  <tbody>
                    <tr>
                      <th className="nowrap">Ročník</th>
                      <td>{classes.year}</td>
                    </tr>
                    <tr>
                      <th className="nowrap">Kód</th>
                      <td>{classes.code}</td>
                    </tr>
                    <tr>
                      <th className="nowrap">Učebna</th>
                      <td>
                        {classes.hasClassroom
                          ? `Ano (${classes.classroomCode})`
                          : "Ne"}
                      </td>
                    </tr>
                    <tr>
                      <th className="nowrap">Studenti</th>
                      <td>
                        {studentNames && studentNames.length > 0
                          ? studentNames.join(", ")
                          : "Žádní studenti"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card col-12 col-5">
              <h1>Smazání třídy</h1>
              <p className="hint">
                Pro smazání napiš ročník třídy (např. {classes.year}).
              </p>
              <form>
                <input
                  type="number"
                  placeholder={classes.year}
                  onChange={handleChange}
                />
                <button className="btn btn-danger" onClick={handleDelete}>
                  Smazat třídu
                </button>
                {info && <p className="alert alert-danger">{info}</p>}
              </form>
              <div className="actions">
                <Link className="btn btn-ghost" to={"/"}>
                  Domů
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
