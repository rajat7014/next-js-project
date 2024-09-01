// import Link from "next/link";
import MovieCard from "@/app/components/MovieCard";
import styles from '@/app/styles/common.module.css'

const movie = async () => {

  await new Promise(resolve => setTimeout(resolve, 2000));

  const url = process.env.RAPID_KEY;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '02abb85be4msh7165dd6436b023fp1020a6jsnb5b6fb12fe2f',
      'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
    }
  };
const res = await fetch(url,options);
const data = await res.json();
const main_data = data.titles;
console.log(main_data.jawSummary);

  return (
    <>
    <section className={styles.movieSection} >
      <div className={styles.container}>
    <h1>series & movie</h1>
    <div className={styles.card_section}>
     
    {
      main_data.map((curElem)=>{
        return <MovieCard key = {curElem.id} {...curElem}/>
      })
    }
    </div>
    </div>
    </section>
    </>
  )
}

export default movie;

