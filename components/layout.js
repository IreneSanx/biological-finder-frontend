import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const name = 'SEARCHER'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home }) {
  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <br/>
      <header className="text-center">
        {home ? (
          <>
            <Image
              priority
              src="/images/profile2.jpg"
              className="rounded-circle"
              height={160}
              width={160}
              alt={name}
            />
            <h2>{name}</h2>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile2.jpg"
                  className="rounded-circle"
                  height={130}
                  width={130}
                  alt={name}
                />
              </a>
            </Link>
            <h3>
              <Link href="/">
                <a className="text-dark">{name}</a>
              </Link>
            </h3>
          </>
        )}
      </header>
      <main>{children}</main>
      
    </div>
  )
}