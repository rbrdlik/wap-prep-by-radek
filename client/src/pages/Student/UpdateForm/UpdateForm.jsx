import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateStudent, getStudentById } from "../../../models/Student";
import { getAllClasses } from "../../../models/Classes";

export default function UpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [info, setInfo] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [classes, setClasses] = useState([]);

  const loadStudent = async () => {
    const data = await getStudentById(id);

    if (data.status === 500 || data.status === 404) {
      setLoaded(null);
      return;
    }

    if (data.status === 200) {
      const student = data.payload;

      setFormData({
        name: student.name || "",
        age: student.age || "",
        gradeAverage: student.gradeAverage || "",
        class:
          typeof student.class === "object"
            ? student.class?._id
            : student.class || "",
      });

      setLoaded(true);
    }
  };

  const loadClasses = async () => {
    const data = await getAllClasses();

    if (data.status === 404) {
      setClasses([]);
    }

    if (data.status === 200) {
      setClasses(data.payload);
    }
  };

  useEffect(() => {
    loadStudent();
    loadClasses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePost = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      class: formData.class === "" ? null : formData.class,
    };

    const data = await updateStudent(id, dataToSend);

    if (data.status === 200) {
      navigate(`/student/${data.payload._id}`);
    } else {
      setInfo(data.msg);
    }
  };

  if (loaded === null) {
    return (
      <div className="page">
        <div className="container">
          <div className="card">
            <h1>Student nenalezen</h1>
            <p className="alert alert-danger">Studenta se nepodařilo načíst.</p>
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
    );
  }

  if (!loaded || !formData) {
    return (
      <div className="page">
        <div className="container">
          <div className="card">
            <h1>Úprava studenta</h1>
            <p>Načítání studenta…</p>
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
              <h1>Upravit studenta</h1>
              <p className="subtitle">ID: {id}</p>
            </div>
            <div className="actions">
              <Link className="btn btn-ghost" to={`/student/${id}`}>
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
                type="number"
                required
                name="age"
                placeholder="Věk"
                value={formData.age}
                onChange={handleChange}
              />

              <input
                type="number"
                required
                name="gradeAverage"
                placeholder="Průměr známek"
                value={formData.gradeAverage}
                onChange={handleChange}
              />

              <select name="class" value={formData.class} onChange={handleChange}>
                <option value="">Bez třídy</option>

                {classes.map((c) => (
                  <option key={c._id} value={c._id}>
                    {`${c.year}.${c.code}`}
                  </option>
                ))}
              </select>

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
