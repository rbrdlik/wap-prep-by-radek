import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createStudent } from "../../../models/Student";
import { getAllClasses } from "../../../models/Classes";

export default function CreateForm() {
  const [formData, setFormData] = useState();
  const [classes, setClasses] = useState();
  const [loaded, setLoaded] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getAllClasses();
    if (data.status === 404) {
      setClasses([]);
      setLoaded(true);
      return;
    }
    if (data.status === 200) {
      setClasses(data.payload);
      setLoaded(true)
    }
    if (data.status === 500) {
      setClasses([]);
      setLoaded(true);
      setInfo("Nepodařilo se načíst třídy.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const postForm = async () => {
    const student = await createStudent(formData);
    if (student.status === 201) {
      redirectToSuccessPage(student.payload._id);
    } else {
      setInfo(student.msg);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  const redirectToSuccessPage = (id) => {
    return navigate(`/createdstudent/${id}`);
  };

  if (!loaded) {
    return (
      <>
        <div className="page">
          <div className="container">
            <div className="card">
              <h1>Vytvořit studenta</h1>
              <p>Načítání tříd…</p>
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
              <h1>Vytvořit studenta</h1>
              <p className="subtitle">Vyplň údaje a studenta ulož.</p>
            </div>
            <div className="actions">
              <Link className="btn btn-ghost" to={"/"}>
                Domů
              </Link>
              <Link className="btn" to={"/students"}>
                Seznam studentů
              </Link>
            </div>
          </div>

          <div className="card">
            <form>
              <input
                type="text"
                required
                name="name"
                placeholder="Jméno studenta"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="number"
                required
                name="age"
                placeholder="Věk"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="number"
                required
                name="gradeAverage"
                placeholder="Průměr známek"
                onChange={(e) => handleChange(e)}
              />

              <select
                name="class"
                defaultValue=""
                onChange={(e) => handleChange(e)}
              >
                <option value="" disabled>
                  Vyber třídu (volitelné)
                </option>
                {classes.length === 0 && (
                  <option value="" disabled>
                    Žádné třídy
                  </option>
                )}
                {classes?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.year}.{c.code}
                  </option>
                ))}
              </select>

              <button className="btn btn-primary" onClick={handlePost}>
                Vytvořit studenta
              </button>
              {info && <p className="alert alert-danger">{info}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
