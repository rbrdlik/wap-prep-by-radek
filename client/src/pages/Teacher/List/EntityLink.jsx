import { Link } from "react-router-dom";

export default function EntityLink({ props }) {
  return (
    <>
      <p>Učitel: {props.name}</p>
      <Link to={`/teacher/${props._id}`}>
        <p>Detail učitele</p>
      </Link>
    </>
  );
}

