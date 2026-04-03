import styles from './home.module.scss';
import React, {useState, useEffect} from 'react';

function Home(){
    const [jokes, setJokes] = useState([]);
    const [random, setRandom] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [count, setCount] = useState(5);

    useEffect(() => {
        async function getJokes(){
            const response = await fetch('/jokes.json');
            const result = await response.json();
            //console.log(result.jokes)
            setJokes(result.jokes)
        }
        getJokes()
    },[])

      useEffect(() => {
        setShowAnswer(false); 
        setCount(5); 

        const interval = setInterval(() => {
            setCount(prev => {
                if (prev <= 1) {
                    clearInterval(interval); 
                    setShowAnswer(true); 
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval); 
    }, [random]); 
    useEffect(() => {
        if (jokes.length > 0) {
            setRandom(Math.floor(Math.random() * jokes.length));
        }
    }, [jokes.length]); 

    //console.log(filter)
    //console.log(random)
    //console.log(filtered[random]?.jokes)
    return(
        <>
            <section className={styles.home}>

                <section className={styles.displayContainer}>
                    <div className={styles.setup}>
                        <p>{jokes[random]?.jokes}</p>
                    </div>
                    <div className={styles.answer}>
                        {showAnswer ? jokes[random]?.response : 
                        (
                            <p className={styles.rAnswer}><span className={styles.count}>{count}</span></p>
                        )}
                    </div>
                    <button onClick={() => {setRandom(prev => (prev + 1) % jokes.length)}}>next joke</button>
                </section>
            </section>
        </>
    )
};

export default Home;
