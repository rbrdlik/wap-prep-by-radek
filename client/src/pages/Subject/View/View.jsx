import { Link, useParams, useNavigate } from "react-router-dom";
import { getSubjectById, deleteSubject } from "../../../models/Subject";
import { getTeachersNamesBySubjectId } from "../../../models/Teacher";
import { useEffect, useState } from "react";

export default function View() {
  const { id } = useParams();
  const [subject, setSubject] = useState();
  const [loaded, setLoaded] = useState();
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const [teacherNames, setTeacherNames] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getSubjectById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setSubject(data.payload);
      await loadTeacherNames(id);
      setLoaded(true);
    }
  }

  const loadTeacherNames = async (subjectId) => {
    const data = await getTeachersNamesBySubjectId(subjectId);
    if (data.status === 200) {
      setTeacherNames(data.payload);
      return;
    }
    setTeacherNames([]);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (formData === subject.name) {
      const result = await deleteSubject(id);
      if (result.status === 200) {
        redirect(id);
      } else {
        setInfo(result.msg);
      }
    } else {
      setInfo("Nesprávně zadaný název předmětu");
    }
  }

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const redirect = (id) => {
    return navigate(`/deletedsubject/${id}`);
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
              <h1>Předmět nenalezen</h1>
              <p className="alert alert-danger">
                Předmět s tímto ID neexistuje nebo byl smazán.
              </p>
              <div className="actions">
                <Link className="btn" to={"/subjects"}>
                  Zpět na seznam předmětů
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
              <h1>Detail předmětu</h1>
              <p>Načítání předmětu…</p>
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
              <h1>Detail předmětu {subject.name}</h1>
              <p className="subtitle">ID: {id}</p>
            </div>
            <div className="actions">
              <Link className="btn" to={`/updatesubject/${id}`}>
                Upravit
              </Link>
              <Link className="btn btn-ghost" to={"/subjects"}>
                Seznam předmětů
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
                      <th className="nowrap">Název</th>
                      <td>{subject.name}</td>
                    </tr>
                    <tr>
                      <th className="nowrap">Kód</th>
                      <td>{subject.code}</td>
                    </tr>
                    <tr>
                      <th className="nowrap">Ročník</th>
                      <td>{subject.year}</td>
                    </tr>
                    <tr>
                      <th className="nowrap">Min. hodin/týden</th>
                      <td>{subject.minimumHoursPerWeek}</td>
                    </tr>
                    <tr>
                      <th className="nowrap">Učí</th>
                      <td>
                        {teacherNames && teacherNames.length > 0
                          ? teacherNames.join(", ")
                          : "Žádní učitelé"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card col-12 col-5">
              <h1>Smazání předmětu</h1>
              <p className="hint">
                Pro smazání napiš název předmětu přesně ({subject.name}).
              </p>
              <form>
                <input
                  type="text"
                  placeholder={subject.name}
                  onChange={handleChange}
                />
                <button className="btn btn-danger" onClick={handleDelete}>
                  Smazat předmět
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
