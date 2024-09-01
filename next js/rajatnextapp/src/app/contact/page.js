import ContactCard from "../components/ContactCard";
import styles from "@/app/contact/contact.module.css"
import ContactForm from "../components/ContactForm";
const contact = () => {
  return (
    <>
    <div className={styles.container} >
    <h1>Contact Us</h1>
    <ContactCard/>

    <section className={styles.contact_section}>
      <h2>We'd love to hear <span>from you</span></h2>
<ContactForm/>
    </section>
    </div>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.5385611826996!2d77.50574027414268!3d28.46332329174703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1d6ef1f39f1%3A0x992c6d728618947b!2sJaypee%20Greens%20Pari%20Chowk!5e0!3m2!1sen!2sin!4v1717326647626!5m2!1sen!2sin" width={600} height={450} 
    style={{border:0}} allowfullscreen="" loading="lazy" className={styles.mapping} referrerpolicy="no-referrer-when-downgrade"></iframe>
    </>
  )
}

export default contact;