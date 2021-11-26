import React from 'react'
import { Typography } from 'antd'
import imgslide1 from '../../../assets/images/slide-img.jpg'
import imgslide2 from '../../../assets/images/slide-img2.jpg'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const { Title } = Typography

const AppTitle = ({ title }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoPlay: true
      };
    return (
    <div>
        <div className="app-banner">
                <Slider {...settings} >
                    <div>
                        <img src = {imgslide1}></img>
                    </div>
                    <div>
                        <img src = {imgslide2}></img>
                    </div>
                </Slider>
        </div>
    </div>
    )
}

export default AppTitle
