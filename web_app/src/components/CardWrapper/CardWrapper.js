import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const CardWrapper = (props) => {
    return (
        <Card >
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Word of the Day
        </Typography>

            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

// Card.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default CardWrapper;