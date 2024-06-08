import classes from './not-found.module.css'
import image from '../assets/not-found.png'
import Image from 'next/image'

export default function NotFound() {
    return <main className={classes.main}>
        <Image src={image} alt='not found image'/>
        <h1>Not Found</h1>
        <p>Unfortunately, we could not find the requested page or resource.</p>
    </main>
}