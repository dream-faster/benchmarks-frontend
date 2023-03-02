import { Meta } from '@/layouts/Meta';
import { getSortedPostsData } from '@/lib/datasets';
import { Main } from '@/templates/Main';
import OneSection from '@/templates/OneSection';

export default function Index({
  allPostsData,
}: {
  allPostsData: [string, string, string, string];
}): JSX.Element {
  // const router = useRouter();

  return (
    <Main
      wide={true}
      meta={
        <Meta
          title="Projects >> Nowcasting Eval AI Studio"
          description="Independent R&D studio specialized in Artificial Intelligence and Nowcasting."
          social_card_ending="datasets"
        />
      }
    >
      <OneSection>
        <h1>{allPostsData}</h1>
        {/* <ProjectsSection allPostsData={allPostsData} baseUrl="datasets" all /> */}
      </OneSection>
    </Main>
  );
}

export async function getStaticProps() {
  // const allPostsData = getSortedPostsData();

  const res = await fetch(
    'https://raw.githubusercontent.com/dream-faster/benchmarking-test/master/results/model.csv'
  );
  const allPostsData = await res.json();

  // console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}
