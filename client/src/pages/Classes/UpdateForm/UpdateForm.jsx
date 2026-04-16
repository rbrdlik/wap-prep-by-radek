import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateClass, getClassById } from "../../../models/Classes";

export default function UpdateForm() {
  const { id } = useParams();  
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const [loaded, setLoaded] = useState();
  const [classes, setClasses] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getClassById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setClasses(data.payload);
      setLoaded(true);
    }
  }

  const postForm = async () => {
    const data = await updateClass(id, formData);
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
    return navigate(`/class/${id}`);
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
              <h1>Třída nenalezena</h1>
              <p className="alert alert-danger">Třídu se nepodařilo načíst.</p>
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
              <h1>Úprava třídy</h1>
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
              <h1>Upravit třídu</h1>
              <p className="subtitle">ID: {id}</p>
            </div>
            <div className="actions">
              <Link className="btn btn-ghost" to={`/class/${id}`}>
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
                type="number"
                required
                name="year"
                placeholder="Ročník"
                defaultValue={classes.year}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                required
                name="code"
                placeholder="Kód třídy"
                defaultValue={classes.code}
                onChange={(e) => handleChange(e)}
              />

              <label>
                <input
                  type="checkbox"
                  name="hasClassroom"
                  defaultChecked={classes.hasClassroom}
                  onChange={(e) => handleCheckbox(e)}
                />
                Třída má učebnu
              </label>

              {(formData?.hasClassroom ?? classes.hasClassroom) && (
                <input
                  type="text"
                  name="classroomCode"
                  placeholder="Číslo učebny"
                  defaultValue={classes.classroomCode}
                  onChange={(e) => handleChange(e)}
                />
              )}

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
