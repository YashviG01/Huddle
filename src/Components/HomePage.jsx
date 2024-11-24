import React from "react";
import "/src/HomePage.css";

const HomePage = () => {
    return (
        <>
            <div className="container">
                <div className="logo-div">
                    <img src="src/assets/logo.png" alt="logo" width="50px" height="50px" />
                    <div>
                        <h1 className="logo">HUDDLE HUB</h1>
                        <p className="logo">- LET US CONNECT -</p>
                    </div>
                </div>
                <div className="content">
                    <div className="description">
                        <h1>Video calls and meetings <br /> for everyone</h1>
                        <p><span>Connect, collaborate and celebrate from <br />
                            anywhere with Huddle Hub</span></p>
                        <button> <img src="src/assets/meet.svg" /> New Meeting</button>
                        <button>
                            <img src='src/assets/link.svg' alt='link svg' />
                            <input className='link-input' type='text' placeholder='Enter meet Link' />
                        </button>
                    </div>
                    {/* <div class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="src/assets/slider1.png" class="d-block w-100" alt="slider-image" />
                            </div>
                            <div class="carousel-item">
                                <img src="src/assets/slider2.png" class="d-block w-100" alt="slider-image" />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
};

export default HomePage;
