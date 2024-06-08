
import Link from "next/link";
import classes from "./page.module.css";

export default function Home() {
  return (
    <main className={classes.main}>
      <h1 className={classes.text}>This is the home page</h1>
      <p className={classes.text}>nothing special</p>
      <h3 className={classes.text}>But you can click <Link href='/rates'>HERE</Link> to check the currency exchange rates</h3>
    </main>
  );
}
