import React from 'react';
import { Container, makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));


const Home: React.FC = () => {
    // const [token, setToken] = useState("");
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h1">Hello!</Typography>
        </Container>
    );
}

export default Home;
