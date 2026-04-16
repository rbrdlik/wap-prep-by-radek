import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createClass } from "../../../models/Classes";

export default function CreateForm() {
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const classes = await createClass(formData);
    if (classes.status === 201) {
      redirectToSuccessPage(classes.payload._id);
    } else {
      setInfo(classes.msg);
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
    return navigate(`/createdclass/${id}`);
  };

  return (
    <>
      <div className="page">
        <div className="container">
          <div className="header">
            <div>
              <h1>Vytvořit třídu</h1>
              <p className="subtitle">Vyplň údaje a třídu ulož.</p>
            </div>
            <div className="actions">
              <Link className="btn btn-ghost" to={"/"}>
                Domů
              </Link>
              <Link className="btn" to={"/classes"}>
                Seznam tříd
              </Link>
            </div>
          </div>

          <div className="card">
            <form>
              <input
                type="number"
                required
                name="year"
                placeholder="Ročník (např. 1)"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                required
                name="code"
                placeholder="Kód třídy (např. A)"
                onChange={(e) => handleChange(e)}
              />

              <label>
                <input
                  type="checkbox"
                  name="hasClassroom"
                  onChange={(e) => handleCheckbox(e)}
                />
                Třída má učebnu
              </label>

              {formData?.hasClassroom && (
                <input
                  type="text"
                  name="classroomCode"
                  placeholder="Číslo učebny (např. 205)"
                  onChange={(e) => handleChange(e)}
                />
              )}

              <button className="btn btn-primary" onClick={handlePost}>
                Vytvořit třídu
              </button>
              {info && <p className="alert alert-danger">{info}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
