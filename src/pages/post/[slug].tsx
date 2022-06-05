// Next
import Head from 'next/head';
import Header from '../../components/Header';
import { GetStaticPaths, GetStaticProps } from 'next';

// Prismic
import { getPrismicClient } from '../../services/prismic';

//Styles
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { RichText } from 'prismic-dom';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[]; // ?
    }[]; // ?
  };
}

interface PostProps {
  post: Post;
}

export default function Post() {
  return (
    <>
      <Head>
        <title>teste</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
          <div className={styles.informations}>
            <time>12 Mar 2021</time>
            <p>Gabriel Henrique</p>
            <time>4 min</time>
          </div>
          <div className={styles.postContent}>
          </div>
        </article>
      </main>
    </>
  )
}

// Casos
// 01. Gerar a página estática durante a build
// 02. Gerar a página estática no primeiro acesso.
// 03. Metade de cada uma dos casos acima.

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});

  const posts = await prismic.getByType("posts");

  const paths = posts.results.map(path => ({
    params: {
      slug: path.uid
    }
  }))

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});

  const slug = params?.slug;

  const response = await prismic.getByUID("posts", String(slug));

  const post = {
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url
      },
      author: response.data.author,
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body] // Desestruturação dos dados
        }
      })
    }
  }

  console.log(post.data.content.body.text);

  return {
    props: {

    }
  };

}



