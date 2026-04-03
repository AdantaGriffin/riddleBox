import styles from './header.module.scss';
import React from 'react';

function Header(){
    return(
        <>
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <h1>🤓RiddleBox</h1>
                    <h3>your daily dose of laughter</h3>
                </div>
            </header>
        </>
    )
};

export default Header;