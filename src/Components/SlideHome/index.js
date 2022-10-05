import { React } from "react";
import './slide.css'
import { Zoom } from 'react-slideshow-image'
import "react-slideshow-image/dist/styles.css";
import banner1 from '../../videos/Banner RR11 (1).gif'
import banner2 from '../../videos/Banner RR11 (2).gif'
import banner3 from '../../videos/Banner RR11 (3).gif'
import banner4 from '../../videos/Banner RR11 (4).gif'
import banner5 from '../../videos/Banner RR11 (5).gif'
import banner6 from '../../videos/Banner RR11 (6).gif'
import './slide.css'

const SlideHome = () => {
    const fadeImages = [
        banner1,
        banner2,
        banner3,
        banner4,
        banner5,
        banner6,
    ];

    return (
        <div className="slide-container">
            <Zoom duration={5000} pauseOnHover={false} scale={0.4}>
                <div className="each-fade">
                    <img className="slideimg" src={fadeImages[0]} />
                </div>
                <div className="each-fade">
                    <img className="slideimg" src={fadeImages[1]} />
                </div>
                <div className="each-fade">
                    <img className="slideimg" src={fadeImages[2]} />
                </div>
                <div className="each-fade">
                    <img className="slideimg" src={fadeImages[3]} />
                </div>
                <div className="each-fade">
                    <img className="slideimg" src={fadeImages[4]} />
                </div>
                <div className="each-fade">
                    <img className="slideimg" src={fadeImages[5]} />
                </div>
            </Zoom>
        </div>
    )

}
export default SlideHome;
