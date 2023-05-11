import React, {Component} from 'react';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
    };
    componentDidMount(){
		// clear Product Selection data when ever home page is loaded
        this.props.handleProductSelections([]);
    };
    render(){
    	return(
			<>
				<div className= 'subHeading text-center'><h2>SERVICES - PRODUCTS - CONSULTING</h2>
					<h2>Zincom Is Your Source For All Your Computer Needs </h2>
				</div>
				<div className=" align-items-center homePage">
					<section className="slideWrapper">
						<div className="mySlides">
							<figure>
								<img src="./img/solution2.jpg" />
								<figcaption >Computer Solutions for Todays Problems</figcaption>
							</figure>
							<figure>
								<img src="./img/comp030.jpg" />
								<figcaption >Products You Can Build With</figcaption>
							</figure>
							<figure>
								<img src="./img/computer2.jpg" />
								<figcaption >Custom Development Tailored to Your Needs</figcaption>
							</figure>
							<figure>
								<img src="./img/solution3.jpg" />
								<figcaption >Designed With You In Mind</figcaption>
							</figure>
							<figure>
								<img src="./img/solution2.jpg" />
								<figcaption >Computer Solutions for Todays Problems</figcaption>
							</figure>
						</div>
					</section>
				</div>
			</>
        )
	};
};

export default Home;