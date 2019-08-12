import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import ButtonBase from "@material-ui/core/ButtonBase";
// import Link from "@material-ui/core/Link"
import './CardWrapper.css'


class CardWrapper extends Component {


    onCardClick = (event) => {
        console.log(this.props)
        // this.props.history.push("/")
    }

    render = () => {
        return (
            <div onClick={this.onCardClick}>
                <Card className="CardWrapper">
                    <CardContent className="CardContent">
                        <h4>
                            {this.props.title || "Default Title"}
                        </h4>
                        {/* <p>
                            {this.props.subtitle || "Default Subtitle"}
                        </p> */}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

// Card.propTypes = {
//     Title: PropTypes.object.isRequired,
//     SubTitle: PropTypes.object.isRequired,
//     Redirect: PropTypes.object.isRequired,
// };

export default CardWrapper;