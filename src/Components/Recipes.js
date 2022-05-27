import { Card, Col, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import styles from "../ModuledStyles/Recipes.module.css"

const Recipes = ({ recipes, isPending, error }) => {
    const defaultimg = 'https://media.istockphoto.com/vectors/mixing-ingredients-line-icon-vector-id1015874904?k=20&m=1015874904&s=612x612&w=0&h=olS5o5L3cxOuyzP4XTxLDTZUBTlpAbDq_jrL82D_chI=';
    return (
        <>
            {error && <div>{error}</div>}
            {isPending && <Col lg="12" className='d-flex justify-content-center'><Spinner animation="grow" /></Col>}
            {
                recipes && recipes.map((r) => (
                    <Col className={`${styles.RecipeCol}`} xs="12" sm="12" md="12" lg="4" key={r.id}>
                        <Link to={`/recipe/${r.id}`} className='LinkStyle'>
                            <Card className={`${styles.RecipeCard}`}>
                                <Card.Img className={styles.CardImg} variant="top" src={r.image ? r.image : defaultimg} />
                                <Card.Body className={styles.CardBody}>
                                    <Card.Title className="TextWrapper">{r.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))
            }
        </>
    );
}

export default Recipes;