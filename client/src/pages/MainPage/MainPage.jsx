import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <>
      <div className="page">
        <div className="container">
          <div className="header">
            <div>
              <h1>Školní evidence</h1>
              <p className="subtitle">
                Třídy, studenti, předměty a učitelé na jednom místě.
              </p>
            </div>
            <span className="pill">Client</span>
          </div>

          <div className="grid">
            <div className="card col-12 col-7">
              <h1>Rychlé akce</h1>
              <div className="actions">
                <Link className="btn btn-primary" to={"/createclass"}>
                  Vytvořit třídu
                </Link>
                <Link className="btn btn-primary" to={"/createstudent"}>
                  Vytvořit studenta
                </Link>
                <Link className="btn btn-primary" to={"/createsubject"}>
                  Vytvořit předmět
                </Link>
                <Link className="btn btn-primary" to={"/createteacher"}>
                  Vytvořit učitele
                </Link>
              </div>
              <p className="hint">
                Tip: v detailu entity můžeš upravovat nebo mazat.
              </p>
            </div>

            <div className="card col-12 col-5">
              <h1>Seznamy</h1>
              <div className="actions">
                <Link className="btn" to={"/classes"}>
                  Seznam tříd
                </Link>
                <Link className="btn" to={"/students"}>
                  Seznam studentů
                </Link>
                <Link className="btn" to={"/subjects"}>
                  Seznam předmětů
                </Link>
                <Link className="btn" to={"/teachers"}>
                  Seznam učitelů
                </Link>
              </div>
              <p className="hint">
                Stránky jsou responzivní a fungují i na mobilu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
