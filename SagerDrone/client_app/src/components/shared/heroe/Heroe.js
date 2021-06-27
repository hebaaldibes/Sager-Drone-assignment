import React  from 'react'
import img from '../../img/heroeImg.png'

function Heroe() {
    return (
        <div className="bg-light mt-5">
            <div className="container">
               <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="col-10 col-sm-8 col-lg-6">
                        <img src={img} className="d-block mx-lg-auto img-fluid" alt="Heroe" width="700" height="500" loading="lazy" />
                    </div>
                    <div className="col-lg-6">
                        <h1 className="display-5 fw-bold lh-1 mb-3 text-info">Sager Drone</h1>
                        <p className="lead">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper quis lectus nulla at volutpat diam. Felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere.
                        </p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Heroe
