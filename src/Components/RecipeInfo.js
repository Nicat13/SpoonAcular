import React from 'react'
import { Col } from 'react-bootstrap'
import styles from "../ModuledStyles/RecipeInfo.module.css"

function RecipeInfo({ recipe }) {
    console.log(recipe);
    const defaultimg = 'https://media.istockphoto.com/vectors/mixing-ingredients-line-icon-vector-id1015874904?k=20&m=1015874904&s=612x612&w=0&h=olS5o5L3cxOuyzP4XTxLDTZUBTlpAbDq_jrL82D_chI=';
    return (
        <>
            {!recipe ? <><Col lg="12" className='d-flex justify-content-center pb-5'><h5 className={styles.Title}><div style={{ borderRadius: '15px', height: '45px', width: '350px' }} className='skeletonloader'></div></h5></Col>
                <Col xs="12" sm="12" md="12" lg="5">
                    <div style={{ height: '350px', borderRadius: '15px' }} className='skeletonloader'></div>
                </Col>
                <Col xs="12" sm="12" md="12" lg="7">
                    <div className={styles.ListWrapper}>
                        <h5 style={{ paddingBottom: '7px' }}>Ingredients</h5>
                        <ul>
                            <div style={{ height: '270px', width: '280px', borderRadius: '15px' }} className='skeletonloader'></div>
                        </ul>
                    </div>
                </Col></> : <>
                <Col lg="12" className='d-flex justify-content-center pb-5'><h5 className={styles.Title}>{recipe.title}</h5></Col>
                <Col xs="12" sm="12" md="12" lg="5">
                    <img className={styles.RecipeImg} src={recipe.image ? recipe.image : defaultimg} alt="img" />
                </Col>
                <Col xs="12" sm="12" md="12" lg="7">
                    <div className={styles.ListWrapper}>
                        <h5 style={{ paddingBottom: '7px' }}>Ingredients</h5>
                        <ul>
                            {
                                recipe.extendedIngredients.map((r) => (
                                    <li key={r.id}>{r.original}</li>
                                ))
                            }
                        </ul>
                    </div>
                </Col></>}
        </>
    )
}

export default RecipeInfo