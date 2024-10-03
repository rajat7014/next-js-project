 'use client'
 
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
 import Autoplay from "embla-carousel-autoplay"
import messages from '@/messages.json'
import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

const Home = () => {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Courier New', Courier, monospace",
      backgroundColor: '#1c1c1c',
      color: '#e0e0e0',
      minHeight: '100vh',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#333',
      padding: '15px',
      borderBottom: '3px solid #555',
    },
    navLink: {
      color: '#e0e0e0',
      textDecoration: 'none',
      fontSize: '1.2rem',
      marginRight: '20px',
      transition: 'color 0.3s ease',
    },
    navLinkHover: {
      color: '#f39c12',
    },
    header: {
      textAlign: 'center',
      padding: '50px 0',
      backgroundColor: '#1b1b1b',
      borderBottom: '5px solid #f39c12',
    },
    headerText: {
      fontSize: '3rem',
      color: '#e0e0e0',
      letterSpacing: '5px',
    },
    subHeader: {
      fontSize: '1.5rem',
      color: '#aaa',
    },
    mysterySection: {
      marginTop: '30px',
      textAlign: 'center',
      fontSize: '1.2rem',
      color: '#ccc',
      lineHeight: '1.8',
    },
    card: {
      backgroundColor: '#333',
      border: '1px solid #555',
      borderRadius: '10px',
      padding: '20px',
      margin: '20px 0',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      color: '#fff',
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
    },
    button: {
      display: 'inline-block',
      padding: '12px 30px',
      backgroundColor: '#f39c12',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '8px',
      transition: 'background-color 0.3s ease',
      marginTop: '20px',
    },
    buttonHover: {
      backgroundColor: '#e67e22',
    },
    footer: {
      backgroundColor: '#333',
      color: '#aaa',
      textAlign: 'center',
      padding: '20px 0',
      marginTop: '40px',
    },
    footerText: {
      fontSize: '1rem',
    },
  };
  const [hoverNavLink, setHoverNavLink] = React.useState(false);
  const [hoverCard, setHoverCard] = React.useState(false);
  const [hoverButton, setHoverButton] = React.useState(false);
  return (
    <>
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <a
          href="#"
          style={hoverNavLink ? styles.navLinkHover : styles.navLink}
          onMouseEnter={() => setHoverNavLink(true)}
          onMouseLeave={() => setHoverNavLink(false)}
        >
          Home
        </a>
        <a href="#" style={styles.navLink}>Mysteries</a>
        <a href="#" style={styles.navLink}>Contact</a>
      </nav>

      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.headerText}>The Mystery Message</h1>
        <p style={styles.subHeader}>Can you solve the enigma?</p>
      </header>

      {/* Mystery Content Section */}
      <section style={styles.mysterySection}>
        <p>The lights flicker. Shadows dance on the walls. A message appears...</p>
        <div
          style={hoverCard ? { ...styles.card, ...styles.cardHover } : styles.card}
          onMouseEnter={() => setHoverCard(true)}
          onMouseLeave={() => setHoverCard(false)}
        >
          <h3>The Secret Clue</h3>
          <p>
          &quot;In the darkness lies the truth. Only those who dare will find the answer.&quot;
          </p>
        </div>
      </section>

      
      <div style={{ textAlign: 'center' }}>
        <a
          href="#"
          style={hoverButton ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setHoverButton(true)}
          onMouseLeave={() => setHoverButton(false)}
        >
          Reveal the Mystery
        </a>
      </div>
    </div>

    <main className='flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12'>
      <section className='text-center mb-8 md:mb-12'>
        <h1 className='text-3xl md:text-4xl font-semibold'>Dive into the world of Anonymous Conversations</h1>
        <p className='mt-3 md:mt-4 text-base md:text-lg'>Explore Mystery Message - Where your identity remains a asecret</p>
      </section>
      <Carousel plugins={[Autoplay({delay: 2000})]} className="w-full max-w-xs">
      <CarouselContent>
        {/* {Array.from({ length: 5 }).map((_, index) => (
          
        ))} */}
      {
        messages.map((message, index)=>(
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardHeader>
                  {message.title}
                </CardHeader>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-lg font-semibold">{message.content}</span>

                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))
      }

      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </main>
    <footer className="text-center p-4 md:p-6">2024 Mystery Message. All rights reserved</footer>
    </>
  )
}

export default Home