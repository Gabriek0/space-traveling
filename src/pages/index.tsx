// Next
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

// React Icons
import { FiUser } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";

// Prismic
import Prismic from '@prismicio/client';
import { PrismicDocument } from '@prismicio/types';
import { getPrismicClient } from '../services/prismic';

// Styles
import commonStyles from '../styles/common.module.scss';
import styles from "./home.module.scss";

// Date-fns
import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

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

function Home({ postsPagination }: HomeProps) {
  return (
    <>
      <Head>
        <title>Spacetreveling | Home</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {postsPagination?.results?.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a id={post.uid} href="">
                <h1>{post.data.title}</h1>
                <p>{post.data.subtitle}</p>
                <time>
                  <AiOutlineCalendar size={20} />
                  {format(new Date(post.first_publication_date), "dd/MM/yyyy", { locale: ptBR })}
                </time>
                <span>
                  <FiUser size={20} />
                  {post.data.author}
                </span>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.getByType<PrismicDocument>("posts");

  const next_page = "1";

  const results = response.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      }
    }
  })

  console.log(results);
  console.log(next_page);
  //console.log(JSON.stringify(response, null, 2));

  return {
    props: {
      postsPagination: {
        next_page,
        results
      }
    }
  }
};

