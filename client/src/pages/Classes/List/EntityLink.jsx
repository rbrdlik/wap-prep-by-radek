import { Link } from "react-router-dom"

export default function EntityLink({props}) {

    return (
        <>
            <p>Třída: {props.year}.{props.code}</p>
            <Link to={`/class/${props._id}`}>
                <p>Detail třídy</p>
            </Link>
        </>
    )
}