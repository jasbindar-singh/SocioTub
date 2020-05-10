import React from 'react'
import { Button } from "react-bootstrap"
import home from "../../assets/images/home.png"

function Home() {
    return (
        <div className="py-5 px-5 d-flex align-items-center flex-column text-center">
            <h1>Welcome to *SocioTub*</h1>
            <img className="img-fluid" src={home} alt="SocioTub Logo" />
            <p className="text-center mb-4">
                A simple app to interact with your friends and colleages,<br/>
                Send and receive anonymous messages to each other,<br/>
                The App keeps your identity anonymous, so don't be shy, speak your heart out!
            </p>
            <p>
                <Button href="register" variant="primary">Get Started</Button>
            </p>
        </div>
    )
}

export default Home
