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
    
    render =  () => {
        return (
            <div>
                <Card className="CardWrapper">
                    <CardContent className="CardContent">
                        <h4>
                            {this.props.title || "Default Title"}
                        </h4>
                        <p>
                            {this.props.subtitle || "Default Subtitle"}
                        </p>
                    </CardContent>
                </Card>
                </div>
        );
    }
}

// Card.propTypes = {
//     Title: PropTypes.object.isRequired,
//     SubTitle: PropTypes.object.isRequired,
// };

export default CardWrapper;