import { GetStaticPropsContext } from 'next/types'
import Home from '.'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { slug } = context.params || { slug: '' }
  return {
    props: {
      slug,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export default Home
