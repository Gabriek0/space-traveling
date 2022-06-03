import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';

import Prismic from '@prismicio/client';
import { PrismicDocument } from '@prismicio/types';

import commonStyles from '../styles/common.module.scss';

import styles from "./home.module.scss";

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

function Home() {
  return (
    <>

    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const pages = await prismic.getByType<PrismicDocument>("posts");

  console.log(pages);
  return {
    props: {

    }
  }
};
