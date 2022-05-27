import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./Home";
import Recipe from "./Recipe";

const Pages = () => {
    return (
        <Router>
            <Container className='pt-5 pb-5'>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route path='/recipe/:slug'>
                        <Recipe />
                    </Route>
                </Switch >
            </Container>
        </Router>
    );
}

export default Pages;