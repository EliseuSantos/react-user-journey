import React, {useState} from 'react';
import {JourneyProvider, useJourney} from '@mfe-pro/react-user-journey';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {Alert} from "@mui/material";

interface CartProps {
    onProceedToCheckout: () => void;
}

interface ProductProps {
    onAddToCart: () => void;
}

const Product: React.FC<ProductProps> = ({onAddToCart}) => (
    <Card sx={{maxWidth: 345, marginBottom: 2}}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Product Name
            </Typography>
            <Typography variant="body2" color="text.secondary">
                This is an amazing product that you should definitely buy!
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={onAddToCart}>Add to Cart</Button>
        </CardActions>
    </Card>
);

const Cart: React.FC<CartProps> = ({onProceedToCheckout}) => (
    <div style={{marginTop: '20px'}}>
        <Typography variant="h6" component="h2">
            Cart Summary:
        </Typography>
        <ul>
            <li>Product Name x 1</li>
        </ul>
        <Button variant="contained" onClick={onProceedToCheckout}>Proceed to Checkout</Button>
    </div>
);

const ShopDemo = () => {
    const {startJourney, completeStep} = useJourney();
    const [inCart, setInCart] = useState(false);
    const [journeyDetails, setJourneyDetails] = useState<any>(null);

    const [journeyCompleted, setJourneyCompleted] = useState(false);

    const onJourneyCompletion = (data: any) => {
        setJourneyDetails(data);
        setJourneyCompleted(true);
    };
    const addToCart = () => {
        if (!inCart) {
            startJourney('shopJourney', ['add-to-cart', 'proceed-to-checkout'], onJourneyCompletion, undefined, {timestamp: Date.now()});
            completeStep('shopJourney', 'add-to-cart');
        }
        setInCart(true);
    };

    const proceedToCheckout = () => {
        completeStep('shopJourney', 'proceed-to-checkout');
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Simple Shop Demo
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Product onAddToCart={addToCart}/>
                </Grid>
                {inCart && (
                    <Grid item xs={12}>
                        <Cart onProceedToCheckout={proceedToCheckout}/>
                    </Grid>
                )}
            </Grid>
            <br/>
            {journeyCompleted && (
                <Alert severity="success">
                    <p>Journey <strong>{journeyDetails?.journeyName}</strong> was completed
                        in <strong>{journeyDetails?.totalDuration / 1000} seconds</strong></p>
                    <ul>
                        {journeyDetails?.completedSteps.map((item: any) => (
                            <li><strong>{item?.step}</strong> took <strong>{item?.duration / 1000} seconds</strong></li>
                        ))}
                    </ul>
                </Alert>
            )}
        </Container>
    );
};

const App = () => {
    return (
        <JourneyProvider>
            <ShopDemo/>
        </JourneyProvider>
    );
};

export default App;
