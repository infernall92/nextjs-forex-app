'use client';

import classes from './error.module.css'
import errorImage from "../assets/error.png"
import Image from 'next/image';

export default function Error() {
    return <main className={classes.main}>
        <Image src={errorImage} alt='an error image'/>
        <h1>ERROR</h1>
        <p>Something went wrong, please try again later.</p>
        </main>
}