// Next
import Head from 'next/head';
import Header from '../../components/Header';
import { GetStaticPaths, GetStaticProps } from 'next';

// Prismic
import { getPrismicClient } from '../../services/prismic';


// React Icons
import { FiUser } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";

// Date-fns
import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

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

export default function Post({ post }: PostProps) {

  return (
    <>
      <Head>
        <title>Spacetreveling | {post.data.title}</title>
      </Head>

      <img src={post.data.banner.url} className={styles.banner} />
      <main className={styles.container}>
        <div className={styles.post}>
          <div className={styles.postHeader}>
            <h1>{post.data.title}</h1>

            <ul>
              <li>
                <AiOutlineCalendar size={20} />
                {format(new Date(post.first_publication_date), "dd/MM/yyyy", { locale: ptBR })}
              </li>
              <li>
                <FiUser size={20} />
                {post.data.author}
              </li>
              <li>
                <AiOutlineClockCircle size={20} />
                5 min
              </li>
            </ul>

          </div>

          {post.data.content.map(content => (
            <article key={content.heading}>
              <h2>{content.heading}</h2>
              <div
                className={styles.postContent}
                dangerouslySetInnerHTML={{ __html: RichText.asHtml(content.body) }}
              // Porque utilizar o dangerous?
              // Porque utilizar o RichText
              />
            </article>
          ))
          }
        </div>
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

  const response = await prismic.getByUID("posts", String(slug), {});

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

  return {
    props: {
      post
    }
  };

}



