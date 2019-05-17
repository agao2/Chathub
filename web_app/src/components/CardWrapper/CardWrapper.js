import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './CardWrapper.css'


const CardWrapper = (props) => {
    return (
        <Card className="CardWrapper">
            <CardContent>
                <h4>
                    {props.title || "Default Title"}
                </h4>
                <p>
                    {props.subtitle || "Default Subtitle"}
                </p>
            </CardContent>
        </Card>
    );
}

Card.propTypes = {
    Title: PropTypes.object.isRequired,
    SubTitle: PropTypes.object.isRequired,
};

export default CardWrapper;