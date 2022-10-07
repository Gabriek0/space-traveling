// Next
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

// React Icons
import { FiUser } from 'react-icons/fi';
import { AiOutlineCalendar } from 'react-icons/ai';

// Prismic
import Prismic from '@prismicio/client';
import { PrismicDocument } from '@prismicio/types';
import { getPrismicClient } from '../services/prismic';

// Styles
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

// Date-fns
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';

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
  const formattedPost = postsPagination.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        { locale: ptBR }
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const [posts, setPost] = useState<Post[]>(formattedPost);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  async function handleNextPage(): Promise<void> {
    if (currentPage !== 1 && nextPage === null) {
      return;
    }

    const postsResults = await fetch(`${nextPage}`).then(response =>
      response.json()
    );

    setNextPage(postsResults.next_page);
    setCurrentPage(postsResults.page);

    //setNextPage(postsResults.nextPage);

    const newPosts = postsResults.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: format(
          new Date(post.first_publication_date),
          'dd/MM/yyyy',
          { locale: ptBR }
        ),
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      };
    });

    setPost([...posts, ...newPosts]);
  }

  return (
    <>
      <Head>
        <title>Spacetreveling | Home</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a id={post.uid} href="">
                <h1>{post.data.title}</h1>
                <p>{post.data.subtitle}</p>
                <time>
                  <AiOutlineCalendar size={20} />
                  {post.first_publication_date}
                </time>
                <span>
                  <FiUser size={20} />
                  {post.data.author}
                </span>
              </a>
            </Link>
          ))}
          <div className={styles.buttonContainer}>
            {nextPage && (
              <button onClick={handleNextPage}>Carregar mais posts</button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.getByType<PrismicDocument>('posts', {
    pageSize: 3,
  });

  const postsPagination = {
    next_page: response.next_page,
    results: response.results,
  };

  return {
    props: {
      postsPagination,
    },
  };
};
