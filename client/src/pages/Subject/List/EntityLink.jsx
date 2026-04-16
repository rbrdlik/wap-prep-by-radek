import { Link } from "react-router-dom"

export default function EntityLink({props}) {

    return (
        <>
            <p>Předmět: {props.name}</p>
            <Link to={`/subject/${props._id}`}>
                <p>Detail předmětu</p>
            </Link>
        </>
    )
}