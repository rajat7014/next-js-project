import styles from "@/app/styles/common.module.css"
import Image from "next/image";

const page = async ({params}) => {
  const id  = params.id

  const url = `https://netflix54.p.rapidapi.com/title/details/?ids=${id}&lang=en`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '02abb85be4msh7165dd6436b023fp1020a6jsnb5b6fb12fe2f',
      'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
    }
  };

// const res = await fetch(url,options);
// const data = await res.json();

// let main_data = {};

// if (data && data.length > 0 && data[0].details) {
//  main_data = data[0].details;
// console.log('Movie details:', main_data);
// } else {
//   console.error('No details available for this movie:', data);
//   // Handle the case where data[0] or 'details' is undefined
// }


//   return (
//     <div className={styles.container}>
//     <h2 className={styles.movie_title}>   Netflix \ <span> {main_data?.type || 'Type not available'} </span> </h2>
//     <div className={styles.card_section}>
//         <div>
//             <Image src={main_data.backgroundImage.url || 'No title available'} alt={main_data.title} width={600} height={300} />
//         </div>
//         <div>
//             <h1>{main_data.title}</h1>
//             <p>{main_data.synopsis}</p>
//         </div>
//     </div>
// </div>
//   )
// }


const res = await fetch(url, options);
const data = await res.json();

let main_data = {}; // Set a default value for main_data

// Ensure main_data is populated if the data is valid
if (data && data.length > 0 && data[0].details) {
  main_data = data[0].details;
} else {
  console.error("No valid data received");
}

return (
  <div className={styles.container}>
    <h2 className={styles.movie_title}>
      Netflix \ <span>{main_data?.type || 'Type not available'}</span>
    </h2>

    <div className={styles.card_section}>
      {/* Check if main_data.backgroundImage and its url property exist before rendering */}
      {main_data.backgroundImage && main_data.backgroundImage.url ? (
        <div>
          <Image
            src={main_data.backgroundImage.url}
            alt={main_data.title || 'No title available'}
            width={600}
            height={300}
          />
        </div>
      ) : (
        <p>No background image available</p>
      )}

      <div>
        <h1>{main_data.title || 'No title available'}</h1>
        <p>{main_data.synopsis}</p>
      </div>
    </div>
  </div>
);
}


// 
export default page;


