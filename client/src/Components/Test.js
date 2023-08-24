import { useLocation, useParams } from "react-router";

const Test = (props) => {
    const parameters = useParams();
    const location = useLocation();
    if(location.pathname.search("/custom")) {
        console.log("Custom Order !!!")
    }

    else {
        console.log("Normal Order !!!")
    }
    // console.log(parameters);

    return (
        <div>
            <h2>Test Page</h2>
        </div>
    )
}

export default Test;