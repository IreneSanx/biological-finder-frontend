import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Index({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="w-100 col-auto text-center">
        <p className="mt-4 h5">Select the element from which you would start the search</p>
        <br/>
        <Link href={"/service/genbank"}>
          <a className="h5">Genes</a>
        </Link>
        <br/>
        <br/>
        <Link href={"/service/uniprot"}>
          <a className="h5">Proteins</a>
        </Link>
        <br/>
        <br/>
        <Link href={"/service/omim"}>
          <a className="h5">Diseases</a>
        </Link>
      </div>
    </Layout>
  )
}


