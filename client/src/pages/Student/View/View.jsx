import { Link, useParams, useNavigate } from "react-router-dom";
import { getStudentById, deleteStudent } from "../../../models/Student";
import { getClassById } from "../../../models/Classes";
import { useEffect, useState } from "react";

export default function View() {
  const { id } = useParams();
  const [students, setStudents] = useState();
  const [loaded, setLoaded] = useState();
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const [classInfo, setClassInfo] = useState();
  const [classData, setClassData] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getStudentById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setStudents(data.payload);
      await getClassName(data.payload.class);
      setLoaded(true);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (formData === students.name) {
      const result = await deleteStudent(id);
      if (result.status === 200) {
        redirect(id);
      } else {
        setInfo(result.msg);
      }
    } else {
      setInfo("Špatně zadané jméno studenta");
    }
  }

  const getClassName = async (id) => {
    const classId = typeof id === "object" ? id?._id : id;
    if (!classId) {
      setClassData(null);
      setClassInfo("Tento student není zapsán do žádné třídy");
      return;
    }

    const data = await getClassById(classId);
    if (data.status === 200) {
      setClassData(data.payload);
      setClassInfo(`${data.payload.year}.${data.payload.code}`);
    } else {
      setClassData(null);
      setClassInfo("Tento student není zapsán do žádné třídy");
    }
  };

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const redirect = (id) => {
    return navigate(`/deletedstudent/${id}`);
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
              <h1>Student nenalezen</h1>
              <p className="alert alert-danger">
                Student s tímto ID neexistuje nebo byl smazán.
              </p>
              <div className="actions">
                <Link className="btn" to={"/students"}>
                  Zpět na seznam studentů
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
              <h1>Detail studenta</h1>
              <p>Načítání studenta…</p>
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
              <h1>Detail studenta {students.name}</h1>
              <p className="subtitle">ID: {id}</p>
            </div>
            <div className="actions">
              <Link className="btn" to={`/updatestudent/${id}`}>
                Upravit
              </Link>
              <Link className="btn btn-ghost" to={"/students"}>
                Seznam studentů
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
                      <td>{students.name}</td>
                    </tr>
                    <tr>
                      <th className="nowrap">Věk</th>
                      <td>{students.age}</td>
                    </tr>
                    <tr>
                      <th className="nowrap">Průměr</th>
                      <td>{students.gradeAverage}</td>
                    </tr>
                    <tr>
                      <th className="nowrap">Třída</th>
                      <td>
                        {classData ? (
                          <div className="actions" style={{ margin: 0 }}>
                            <span className="pill">{classInfo}</span>
                            <Link className="btn" to={`/class/${classData._id}`}>
                              Otevřít třídu
                            </Link>
                          </div>
                        ) : (
                          classInfo
                        )}
                      </td>
                    </tr>
                    {classData && (
                      <>
                        <tr>
                          <th className="nowrap">Učebna</th>
                          <td>
                            {classData.hasClassroom
                              ? `Ano (${classData.classroomCode})`
                              : "Ne"}
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card col-12 col-5">
              <h1>Smazání studenta</h1>
              <p className="hint">
                Pro smazání napiš jméno studenta přesně ({students.name}).
              </p>
              <form>
                <input
                  type="text"
                  placeholder={students.name}
                  onChange={handleChange}
                />
                <button className="btn btn-danger" onClick={handleDelete}>
                  Smazat studenta
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
