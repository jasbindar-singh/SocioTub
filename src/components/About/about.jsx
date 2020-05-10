import React from 'react'

function About() {

    return (
        <div className="py-5 px-5">
            <h1 className="mb-4">About</h1>
            <h4>SocioTub</h4>
            <p>
                Is an anonymous message seeking app.<br/>
                It allow you to get anonymous message and feedback from users, all around the globe.<br/>
                You can share your personal SocioTub link and get anonymous feedback from your friends and colleages.<br/>
                The messages you sent and receive are anonymous.<br/>
                Follow the rules and enjoy.
            </p>
            <h4>Team</h4>
            <p>
                <h5>Jasbindar Singh, Frontend Developer</h5>
                This is a personal project, made using ReactJS and Firebase.<br/>
                Have a suggestion?<br/>
                You can connect with me on these platform,<br/>
            </p>
            <ul>
                <li><a target="_blank" rel="noreferrer noopener" href="https://github.com/jasbindar-singh">Github</a></li>
                <li><a target="_blank" rel="noreferrer noopener" href="https://www.linkedin.com/in/singhjs/">LinkedIn</a></li>
                <li><a target="_blank" rel="noreferrer noopener" href="https://twitter.com/JasbindarSing13">Twitter</a></li>
            </ul>
        </div>
    )
}

export default About
