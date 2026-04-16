import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createSubject } from "../../../models/Subject";

export default function CreateForm() {
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const subjects = await createSubject(formData);
    if (subjects.status === 201) {
      redirectToSuccessPage(subjects.payload._id);
    } else {
      setInfo(subjects.msg);
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
    return navigate(`/createdsubject/${id}`);
  };

  return (
    <>
      <div className="page">
        <div className="container">
          <div className="header">
            <div>
              <h1>Vytvořit předmět</h1>
              <p className="subtitle">Vyplň údaje a předmět ulož.</p>
            </div>
            <div className="actions">
              <Link className="btn btn-ghost" to={"/"}>
                Domů
              </Link>
              <Link className="btn" to={"/subjects"}>
                Seznam předmětů
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
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                required
                name="code"
                placeholder="Kód předmětu (např. MAT)"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="number"
                required
                name="year"
                placeholder="Ročník"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="number"
                required
                name="minimumHoursPerWeek"
                placeholder="Minimum hodin týdně"
                onChange={(e) => handleChange(e)}
              />
              <button className="btn btn-primary" onClick={handlePost}>
                Vytvořit předmět
              </button>
              {info && <p className="alert alert-danger">{info}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
