import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createTeacher } from "../../../models/Teacher";
import { getAllSubjects } from "../../../models/Subject";

export default function CreateForm() {
  const [formData, setFormData] = useState();
  const [subjects, setSubjects] = useState();
  const [loaded, setLoaded] = useState(false);
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getAllSubjects();
    if (data.status === 404) {
      setSubjects([]);
      setLoaded(true);
      return;
    }
    if (data.status === 200) {
      setSubjects(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const postForm = async () => {
    const teacher = await createTeacher(formData);
    if (teacher.status === 201) {
      redirectToSuccessPage(teacher.payload._id);
    } else {
      setInfo(teacher.msg);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectToggle = (subjectId, checked) => {
    const current = formData?.subjects || [];
    const next = checked
      ? [...current, subjectId]
      : current.filter((id) => id !== subjectId);
    setFormData({ ...formData, subjects: next });
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  const redirectToSuccessPage = (id) => {
    return navigate(`/createdteacher/${id}`);
  };

  if (!loaded) {
    return (
      <>
        <div className="page">
          <div className="container">
            <div className="card">
              <h1>Vytvořit učitele</h1>
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
              <h1>Vytvořit učitele</h1>
              <p className="subtitle">Vyplň údaje a učitele ulož.</p>
            </div>
            <div className="actions">
              <Link className="btn btn-ghost" to={"/"}>
                Domů
              </Link>
              <Link className="btn" to={"/teachers"}>
                Seznam učitelů
              </Link>
            </div>
          </div>

          <div className="card">
            <form>
              <input
                type="text"
                required
                name="name"
                placeholder="Jméno učitele"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                required
                name="age"
                placeholder="Věk"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="number"
                required
                name="contract"
                placeholder="Úvazek"
                onChange={(e) => handleChange(e)}
              />

              <p className="hint">Předměty (volitelné)</p>
              {subjects.length === 0 && <p className="alert">Žádné předměty</p>}
              {subjects?.map((s) => (
                <label key={s._id}>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleSubjectToggle(s._id, e.target.checked)
                    }
                  />
                  {s.name}
                </label>
              ))}

              <button className="btn btn-primary" onClick={handlePost}>
                Vytvořit učitele
              </button>
              {info && <p className="alert alert-danger">{info}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

