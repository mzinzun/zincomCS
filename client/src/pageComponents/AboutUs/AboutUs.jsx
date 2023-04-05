import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './AboutUs.css';

class AboutUs extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className = 'about row justify-content-end align-items-center'>
                <article className = "article-heading col-sm-6 col-8" ><h1>Our Mission</h1>
                    <article  className = "article-main border">
                        Zincom Computer Solutions provides intuitive services, 
                        products, and ideas to help with all of your computing needs. <Link to ='/contact'>Contact us</Link> to learn more.  
                        You can also buy directly from our <Link to ='/products'>Products</Link> section
                    </article>
                </article>
            </div>
        )
    }
};

export default AboutUs;
