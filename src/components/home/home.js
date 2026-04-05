import styles from './home.module.scss';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Home(){
    const [riddles, setRiddles] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [count, setCount] = useState(10);
    const [level, setLevel] = useState('');
    const [index, setIndex] = useState(0)
    //fetches data when page homepage loads
    useEffect(() => {
        async function getJokes(){
            const response = await fetch('/riddles.json');
            const result = await response.json();
            //console.log(result.jokes)
            setRiddles(result.riddles);
        }
        getJokes()
    },[]);

    const filtered = riddles?.filter(x => x.level === level);
    const current = filtered[index];
    //console.log(filtered)
    console.log(current)

    useEffect(() => {
        if (!current) return;

        setShowAnswer(false); 
        setCount(10);

        const timer = setTimeout(() => {
            setShowAnswer(true);
        }, 3000); 
        
        const interval = setInterval(() => {
            setCount(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return ;
                }
                return prev - 1;
            });
        }, 1000);

        return () => 
        {
            clearTimeout(timer);
            clearInterval(interval);
        }
    }, [index, level, riddles, current]);
    return(
        <>
            <section className={styles.home}>

                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li className={styles.listItem}><Link className={level === "easy" ? styles.isactive : styles.inactive} onClick={() => setLevel('easy')} >easy</Link></li>
                        <li className={styles.listItem}><Link className={level === "medium" ? styles.isactive : styles.inactive} onClick={() => setLevel('medium')}>medium</Link></li>
                        <li className={styles.listItem}><Link className={level === "hard" ? styles.isactive : styles.inactive} onClick={() => setLevel('hard')} >hard</Link></li>
                    </ul>
                </nav>

                <section className={styles.displayContainer}>

                    <div className={styles.setup}>
                        {level ? <p>{current?.riddle}</p> : "choose a level"}
                        
                    </div>

                    <div className={styles.answer}>
                        {showAnswer ? <p className={styles.rAnswer}>{current?.answer}</p> : ''}
                        {level ? <p><span className={styles.count}>{count}</span></p> : ' '}
                       
                    </div>

                    <button onClick={() => {setIndex(prev => (prev + 1) % filtered.length)}}>next riddle</button>

                </section>

            </section>
        </>
    )
};

export default Home;
