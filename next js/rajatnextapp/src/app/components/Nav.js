// import  styles  from "@/app/styles/navbar.module.css";
// import Link from "next/link";

// const Nav = () => {
//   return (
//     <nav className={styles.navbar}>
//          <div> 
//             <ul className={styles.navbarList}>
// <li className={styles.navbarItems}> 
// <Link className={styles.navbarLink} href = "/">
//     Home
// </Link>
//     </li>       
//     <li className={styles.navbarItems}> 
// <Link className={styles.navbarLink} href = "/">
//     About
// </Link>
//     </li> 
//     <li className={styles.navbarItems}> 
// <Link className={styles.navbarLink} href = "/">
//     Movie
// </Link>
//     </li>     
//     <li className={styles.navbarItems}> 
// <Link className={styles.navbarLink} href = "/">
//     Contact
// </Link>
//     </li>         
//             </ul>

//         </div>
//     </nav>
// );
// };

// export default Nav; 


'use client'

import styles from "@/app/styles/navbar.module.css"
import Link from "next/link";
import {useState} from "react";

const Nav = () => {
    const [openMenu, setOpenMenu] = useState(false);
    console.log("value " + openMenu)
    return (
        <>
            <nav className={styles.navbar}>
                <div className={openMenu ? `${styles.active}` : "" }>
                    <ul className={styles.navbarList}>
                        <li className={styles.navbarItem}>
                            <Link className={styles.navbarLink} href="#"
                                  onClick={() => setOpenMenu(false)}
                            >Home</Link>
                        </li>
                        <li className={styles.navbarItem}>
                            <Link className={styles.navbarLink} href="/about"
                                  onClick={() => setOpenMenu(false)}
                            >About</Link>
                        </li>
                        <li className={styles.navbarItem}>
                            <Link className={styles.navbarLink}
                                  onClick={() => setOpenMenu(false)}
                                  href="/movie">Movie</Link>
                        </li>
                        <li className={styles.navbarItem}>
                            <Link className={styles.navbarLink}
                                  onClick={() => setOpenMenu(false)}
                                  href="/contact">Contact</Link>
                        </li>
                    </ul>

                    {/* //nav icon */}
                    <div className={styles['mobile-navbar-btn']}>
                        
                       
                    </div>
                </div>
            </nav>

        </>

    );
};

export default Nav;