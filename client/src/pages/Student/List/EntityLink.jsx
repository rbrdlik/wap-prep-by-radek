import { Link } from "react-router-dom"

export default function EntityLink({props}) {

    return (
        <>
            <p>Student: {props.name}</p>
            <Link to={`/student/${props._id}`}>
                <p>Detail studenta</p>
            </Link>
        </>
    )
}