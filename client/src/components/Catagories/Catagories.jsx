import React, {Component} from 'react';

class Catagories extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <ul className="catList row  justify-content-center align-items-center">
                    {(this.props.cats).map((item,idx) => <li
                        key={idx} 
                        name={item} 
                        className="col  " 
                        onClick = {this.props.getProductsList}>{item}</li>)}
                </ul>
            </>
        )
    }
}

export default Catagories;
