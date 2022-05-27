import { React, useRef, useState } from 'react'
import styles from "../ModuledStyles/Cuisine.module.css"

function Cuisines({ cuisine, cuisines, setCuisine }) {
    const [inputDisabled, setInputDisabled] = useState(false);
    const formelement = useRef(null)
    let isDown = false;
    let startX;
    let scrollLeft;
    const mouseDown = (e) => {
        isDown = true;
        setInputDisabled(false)
        startX = e.pageX - formelement.current.offsetLeft;
        scrollLeft = formelement.current.scrollLeft;
    }
    const mouseLeave = () => {
        isDown = false;
        setInputDisabled(false)
    }
    const mouseUp = () => {
        if (inputDisabled === true) {
            setTimeout(() => {
                setInputDisabled(false)
            }, 800);
        }
        isDown = false;
    }
    const mouseMove = (e) => {
        if (!isDown) {
            setInputDisabled(false)
        }
        else {
            e.preventDefault();
            const x = e.pageX - formelement.current.offsetLeft;
            const walk = x - startX;
            setTimeout(() => {
                setInputDisabled(true)
            }, 300);
            formelement.current.scrollLeft = scrollLeft - walk;
        }
    }

    return (
        <>
            <form className={`${styles.CuisineForm} mb-4`} ref={formelement} onMouseDown={(e) => mouseDown(e)}
                onMouseLeave={(e) => mouseLeave(e)} onMouseUp={(e) => mouseUp(e)} onMouseMove={(e) => mouseMove(e)}>
                {inputDisabled && <div className={styles.Overlay} style={{ width: formelement.current.scrollWidth }}></div>}
                {cuisines.map((c) => (
                    <div className={styles.InputWrapper} key={c}>
                        <input className={styles.CuisineInput} type="radio" id={c} name="cuisine" disabled={inputDisabled} value={c} onChange={(e) => {
                            if (cuisine !== e.target.value) {
                                setCuisine(e.target.value)
                            }
                        }} />
                        <label className={styles.InputLabel} htmlFor={c}>{c}</label>
                    </div>
                ))}
            </form>
        </>
    )
}

export default Cuisines;