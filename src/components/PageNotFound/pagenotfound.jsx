import React from 'react'
import pagenotfound from '../../assets/images/404.jpg'

function PageNotFound() {
    return (
        <div className="text-center">
            <img src={pagenotfound} alt="Page Not Found" className="img-fluid" />
        </div>
    )
}

export default PageNotFound
