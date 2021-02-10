import React from 'react';

import PencilSVG from '../../components/SVGs/PencilSVG';
import wordSVG from '../../assets/SVGs/Microsoft_Office_Word.svg';

import styles from './Home.module.css';


const Home = () => {
   
    return (
        <div className={styles.HomeContainer}>
 
        <div className="text-center">
        <h5 >İş hayatınızı kolaylaştırmak için Microsoft Office<br/> ürünlerine dönüştürülebilir çözümler.</h5>
            <PencilSVG />
            <div className={styles.ImgTxtContainer}>
            <img src={wordSVG} alt="Word Logo" width={50}/>
            <div className={styles.TxtContainer}>
        <h5 >Formlara girdiğiniz verileri<br/> Microsoft Word formatında çıktı alabilirsiniz. </h5>
            </div>
        <img src={wordSVG} alt="Word Logo" width={50}/>

            </div>

        </div>
        </div>

    );
};

export default Home;