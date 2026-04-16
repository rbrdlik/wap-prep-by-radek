import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateSubject, getSubjectById } from "../../../models/Subject";

export default function UpdateForm() {
  const { id } = useParams();  
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const [loaded, setLoaded] = useState();
  const [subjects, setSubjects] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getSubjectById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setSubjects(data.payload);
      setLoaded(true);
    }
  }

  const postForm = async () => {
    const data = await updateSubject(id, formData);
    if (data.status === 200) {
      redirectToSuccessPage(data.payload._id);
    } else {
      setInfo(data.msg);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  const redirectToSuccessPage = (id) => {
    return navigate(`/subject/${id}`);
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
              <h1>Předmět nenalezen</h1>
              <p className="alert alert-danger">Předmět se nepodařilo načíst.</p>
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
              <h1>Úprava předmětu</h1>
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
              <h1>Upravit předmět</h1>
              <p className="subtitle">ID: {id}</p>
            </div>
            <div className="actions">
              <Link className="btn btn-ghost" to={`/subject/${id}`}>
                Zpět na detail
              </Link>
              <Link className="btn btn-ghost" to={"/"}>
                Domů
              </Link>
            </div>
          </div>

          <div className="card">
            <form>
              <input
                type="text"
                required
                name="name"
                placeholder="Název předmětu"
                defaultValue={subjects.name}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                required
                name="code"
                placeholder="Kód předmětu"
                defaultValue={subjects.code}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="number"
                required
                name="year"
                placeholder="Ročník"
                defaultValue={subjects.year}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="number"
                required
                name="minimumHoursPerWeek"
                placeholder="Minimum hodin týdně"
                defaultValue={subjects.minimumHoursPerWeek}
                onChange={(e) => handleChange(e)}
              />
              <button className="btn btn-primary" onClick={handlePost}>
                Uložit změny
              </button>
              {info && <p className="alert alert-danger">{info}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
