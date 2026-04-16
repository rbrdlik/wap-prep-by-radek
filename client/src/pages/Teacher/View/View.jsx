import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getTeacherById,
  deleteTeacher,
  getAllSubjectNamesByTeacherId,
} from "../../../models/Teacher";
import { useEffect, useState } from "react";

export default function View() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState();
  const [loaded, setLoaded] = useState();
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const [subjectNames, setSubjectNames] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getTeacherById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setTeacher(data.payload);
      await loadSubjectNames(id);
      setLoaded(true);
    }
  };

  const loadSubjectNames = async (teacherId) => {
    const data = await getAllSubjectNamesByTeacherId(teacherId);
    if (data.status === 200) {
      setSubjectNames(data.payload);
      return;
    }
    setSubjectNames([]);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (formData === teacher.name) {
      const result = await deleteTeacher(id);
      if (result.status === 200) {
        redirect(id);
      } else {
        setInfo(result.msg);
      }
    } else {
      setInfo("Nesprávně zadané jméno učitele");
    }
  };

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const redirect = (id) => {
    return navigate(`/deletedteacher/${id}`);
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
              <h1>Učitel nenalezen</h1>
              <p className="alert alert-danger">
                Učitel s tímto ID neexistuje nebo byl smazán.
              </p>
              <div className="actions">
                <Link className="btn" to={"/teachers"}>
                  Zpět na seznam učitelů
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

  if (!loaded) {
    return (
      <>
        <div className="page">
          <div className="container">
            <div className="card">
              <h1>Detail učitele</h1>
              <p>Načítání učitele…</p>
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
              <h1>Detail učitele {teacher.name}</h1>
              <p className="subtitle">ID: {id}</p>
            </div>
            <div className="actions">
              <Link className="btn" to={`/updateteacher/${id}`}>
                Upravit
              </Link>
              <Link className="btn btn-ghost" to={"/teachers"}>
                Seznam učitelů
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
                      <th className="nowrap">Jméno</th>
                      <td>{teacher.name}</td>
                    </tr>
                    <tr>
                      <th className="nowrap">Věk</th>
                      <td>{teacher.age}</td>
                    </tr>
                    <tr>
                      <th className="nowrap">Úvazek</th>
                      <td>{teacher.contract}</td>
                    </tr>
                    <tr>
                      <th className="nowrap">Předměty</th>
                      <td>
                        {subjectNames && subjectNames.length > 0
                          ? subjectNames.join(", ")
                          : "Žádné předměty"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card col-12 col-5">
              <h1>Smazání učitele</h1>
              <p className="hint">
                Pro smazání napiš jméno učitele přesně ({teacher.name}).
              </p>
              <form>
                <input type="text" placeholder={teacher.name} onChange={handleChange} />
                <button className="btn btn-danger" onClick={handleDelete}>
                  Smazat učitele
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

