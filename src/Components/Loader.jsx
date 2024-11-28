import React from "react";
import "/src/Loader.css";

const Loader = () => {

    return (
        <>
            <div class="loader-container">
                <div className="loader"></div>
                <p id="text">Loading...</p>
            </div>
        </>
    );
}

export default Loader;