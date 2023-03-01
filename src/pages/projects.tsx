import BreadcrumbSection from '@/components/BreadcrumbSection';
import Seperator from '@/components/Seperator';
import { Meta } from '@/layouts/Meta';
import { getSortedPostsData } from '@/lib/projects';
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
          social_card_ending="projects"
        />
      }
    >
      <OneSection title="projects 👇">
        <div className="w-full px-12">
          <BreadcrumbSection />
        </div>
        <h1>{allPostsData}</h1>
        {/* <ProjectsSection allPostsData={allPostsData} baseUrl="projects" all /> */}
      </OneSection>
      <Seperator />
    </Main>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

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
