import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useQuery, gql } from '@apollo/client';

const GET_LAUNCHES = gql`
  query GetLaunches {
    launches {
      id
      mission_name
    }
  }
`;

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) {

  const { loading, error, data } = useQuery<{launches: {id: number, mission_name: string}[]}>(GET_LAUNCHES);
  
  if (error) {
    console.log('error', error);
    return <p></p>;
  }
  if(data) {
    console.log('data', data);
  }
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <meta
          name="description"
          content={`c2c platform test post here!`}
        />
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <article>
        {loading && <p>Loading...</p>}
        {error && <p>Error :(</p>}
        {data &&
          <ul>
            {data.launches.map(launch => {
              return (
                <li>{launch.mission_name}</li>
              )
            })}
          </ul>
        }
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
}