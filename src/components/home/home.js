import styles from './home.module.scss';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Home(){
    const [jokes, setJokes] = useState([]);
    const [types, setTypes] = useState([])

    const [filter, setFilter] = useState('none');
    const [random, setRandom] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [count, setCount] = useState(5);

    useEffect(() => {
       async function getTypes(){
           const response = await fetch('types.json');
           const result = await response.json();
           //console.log(result.types)
           setTypes(result.types)
       }
       getTypes()
    },[]);

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
    }, [random, filter]); 
    useEffect(() => {
        if (filtered.length > 0) {
            setRandom(Math.floor(Math.random() * filtered.length));
        }
    }, [filter, jokes]); // runs after filter changes

    const filtered = filter === 'none' ? jokes : jokes?.filter(x => x.type === filter);
    //console.log(filter)
    //console.log(random)
    //console.log(filtered[random]?.jokes)
    return(
        <>
            <section className={styles.home}>

                <section className={styles.displayContainer}>
                    <div className={styles.setup}>
                        <p>{filtered[random]?.jokes}</p>
                    </div>
                    <div className={styles.answer}>
                        {showAnswer ? filtered[random]?.response : 
                        (
                            <p className={styles.rAnswer}><span className={styles.count}>{count}</span></p>
                        )}
                    </div>
                    <button onClick={() => {setRandom(prev => (prev + 1) % filtered.length)}}>next riddle</button>
                </section>
            </section>
        </>
    )
};

export default Home;
