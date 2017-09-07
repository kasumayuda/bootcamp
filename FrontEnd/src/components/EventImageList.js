import { PropTypes, Component } from 'react';
import {Carousel} from 'react-responsive-carousel';

import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';


export class EventImageList extends Component{
    constructor(props){
        super(props);        
    }
    
    render(){
        var height = "480px";
        var width = "640px";
        return(
            <Carousel autoPlay={true} infiniteLoop={true}>
                <div>
                    <img width={width} height={height} src="http://borobudurmarathon.co.id/wp-content/uploads/2017/03/20161120WEN11_resize-1024x640.jpg"/>
                    <p className="legend">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
                <div>
                    <img width={width} height={height} src="http://www.borobudursunrise.net/images/upload/image/Ramayana%20Ballet%20Baru2.png"/>
                    <p className="legend">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
                <div>
                    <img width={width} height={height} src="https://www.tournesia.com/wp-content/uploads/2015/06/prambanan-ramayana-ballet-01-795x413.jpg"/>
                    <p className="legend">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </Carousel>
        )
    }

}