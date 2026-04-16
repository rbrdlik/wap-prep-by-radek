import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateTeacher, getTeacherById } from "../../../models/Teacher";
import { getAllSubjects } from "../../../models/Subject";

export default function UpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [info, setInfo] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const loadTeacher = async () => {
    const data = await getTeacherById(id);
    if (data.status === 500 || data.status === 404) {
      setLoaded(null);
      return;
    }

    if (data.status === 200) {
      const teacher = data.payload;
      const teacherSubjects = (teacher.subjects || []).map((s) =>
        typeof s === "object" ? s?._id : s
      );

      setFormData({
        name: teacher.name || "",
        age: teacher.age || "",
        contract: teacher.contract || "",
        subjects: teacherSubjects,
      });

      setLoaded(true);
    }
  };

  const loadSubjects = async () => {
    const data = await getAllSubjects();
    if (data.status === 404) {
      setSubjects([]);
      return;
    }
    if (data.status === 200) {
      setSubjects(data.payload);
    }
  };

  useEffect(() => {
    loadTeacher();
    loadSubjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubjectToggle = (subjectId, checked) => {
    const current = formData?.subjects || [];
    const next = checked
      ? [...current, subjectId]
      : current.filter((id) => id !== subjectId);
    setFormData({ ...formData, subjects: next });
  };

  const handlePost = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      subjects:
        formData?.subjects && formData.subjects.length > 0
          ? formData.subjects
          : [],
    };

    const data = await updateTeacher(id, dataToSend);
    if (data.status === 200) {
      navigate(`/teacher/${id}`);
    } else {
      setInfo(data.msg);
    }
  };

  if (loaded === null) {
    return (
      <div className="page">
        <div className="container">
          <div className="card">
            <h1>Učitel nenalezen</h1>
            <p className="alert alert-danger">Učitele se nepodařilo načíst.</p>
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
    );
  }

  if (!loaded || !formData) {
    return (
      <div className="page">
        <div className="container">
          <div className="card">
            <h1>Úprava učitele</h1>
            <p>Načítání učitele…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page">
        <div className="container">
          <div className="header">
            <div>
              <h1>Upravit učitele</h1>
              <p className="subtitle">ID: {id}</p>
            </div>
            <div className="actions">
              <Link className="btn btn-ghost" to={`/teacher/${id}`}>
                Zpět na detail
              </Link>
              <Link className="btn btn-ghost" to={"/"}>
                Domů
              </Link>
            </div>
          </div>

          <div className="card">
            <form onSubmit={handlePost}>
              <input
                type="text"
                required
                name="name"
                placeholder="Jméno"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="text"
                required
                name="age"
                placeholder="Věk"
                value={formData.age}
                onChange={handleChange}
              />

              <input
                type="number"
                required
                name="contract"
                placeholder="Úvazek"
                value={formData.contract}
                onChange={handleChange}
              />

              <p className="hint">Předměty</p>
              {subjects.length === 0 && <p className="alert">Žádné předměty</p>}
              {subjects.map((s) => (
                <label key={s._id}>
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(s._id)}
                    onChange={(e) => handleSubjectToggle(s._id, e.target.checked)}
                  />
                  {s.name}
                </label>
              ))}

              <button className="btn btn-primary" type="submit">
                Uložit změny
              </button>
            </form>

            {info && <p className="alert alert-danger">{info}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

