// import Plot from 'react-plotly.js';
import dynamic from 'next/dynamic';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import OneSection from '@/templates/OneSection';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function Index({
  allPostsData,
  allTopicsData,
}: {
  allPostsData: [string, string, string, string];
  allTopicsData: [string, string, string, string];
}): JSX.Element {
  // const router = useRouter();

  return (
    <Main
      wide={true}
      meta={
        <Meta
          title="Dream Faster AI Studio"
          description="Independent R&D studio specialized in Artificial Intelligence."
          social_card_ending="landing"
        />
      }
    >
      <OneSection>
        <Plot
          data={[
            {
              x: [1, 2, 3],
              y: [allPostsData * 2, allPostsData * 3, allPostsData * 4],
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
            { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
        />
      </OneSection>

      {/* <OneSection>
        <Hero />
      </OneSection>
      <OneSection title="projects 👇">
        <ProjectsSection allPostsData={allPostsData} baseUrl="projects" />
        <MinorButton to="/projects" text="All Projects" />
      </OneSection>
      <OneSection title="links 👇">
        <div className="flex flex-col flex-wrap items-start justify-start px-8 md:flex-row">
          <MajorButton
            text="GitHub Organisation"
            link="https://github.com/dream-faster"
            external
          />
          <MajorButton
            text="Applied Exploration Blog"
            link="https://www.appliedexploration.com/"
            external
            primary
          />
        </div>
      </OneSection>
      <OneSection title="topics 👇">
        <ProjectsSection allPostsData={allTopicsData} baseUrl="topics" all />
        <MinorButton to="/topics" text="All Topics" />
      </OneSection>
      <Seperator /> */}
    </Main>
  );
}

export async function getStaticProps() {
  // const allPostsData = getSortedPostsData();
  // const allTopicsData = getSortedTopicsData();

  const res = await fetch(
    'https://raw.githubusercontent.com/dream-faster/benchmarking-test/master/results/model.csv'
  );
  const allPostsData = await res.json();
  const allTopicsData = allPostsData;

  return {
    props: {
      allPostsData,
      allTopicsData,
    },
  };
}
