// import Plot from 'react-plotly.js';
import { DataFrame, fromCSV, Series } from 'data-forge';
import dynamic from 'next/dynamic';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import OneSection from '@/templates/OneSection';

const Card = (props) => (
  <div className="card w-96 bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">Card title!</h2>
      <p>{props.children}</p>
      <div className="card-actions justify-end">
        <button className="btn-primary btn">Buy Now</button>
      </div>
    </div>
  </div>
);

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
const Table = (props) => {
  const values = [
    ['Books', 'Clothes', 'Medicals'],
    [
      '$22',
      '$190',
      '<a href="https://github.com/dream-faster/benchmarking-test">Link to site</a>',
    ],
  ];
  const headers = [['<b> Item </b>'], ['<b> Expenditure </b>']];
  const data = [
    {
      type: 'table',
      header: {
        values: headers,
        align: 'center',
        presentation: 'markdown',
      },
      cells: {
        values,
        align: 'center',
      },
    },
  ];

  return (
    <Plot data={data} layout={{ width: 500, height: 500, title: 'Table' }} />
  );
};

export default function Index({ date, close }) {
  // const router = useRouter();

  return (
    <Main
      wide={true}
      meta={
        <Meta
          title="Nowcasting Benchmarks"
          description="Continously Validated models on public Time Series Datasets."
          social_card_ending="landing"
        />
      }
    >
      <OneSection>
        <Card>
          <Plot
            data={[
              {
                x: date,
                y: close,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' },
              },
            ]}
            layout={{ title: 'A Fancy Plot' }}
          />
        </Card>
        <Card>
          <Table />
        </Card>
      </OneSection>
    </Main>
  );
}

function fetchCsv() {
  return fetch(
    'https://raw.githubusercontent.com/dream-faster/benchmarking-test/master/results/bitcoin.csv'
  ).then(function (response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    return reader.read().then(function (result) {
      return decoder.decode(result.value);
    });
  });
}

export async function getStaticProps() {
  // const allPostsData = getSortedPostsData();
  // const allTopicsData = getSortedTopicsData();

  // const res = await fetch(
  //   'https://raw.githubusercontent.com/dream-faster/benchmarking-test/master/results/model.csv'
  // );
  // const resultsData = await res.json();
  // const bitcoin = await fetch(
  //   'https://raw.githubusercontent.com/dream-faster/benchmarking-test/master/results/bitcoin.csv'
  // );
  const bitcoinData = await fetchCsv();

  // raw.githubusercontent.com/Unsigned-Research/enoki-research/main/results.csv?token=GHSAT0AAAAAAB65Q4QLH63AHK64XZSFPI2CY77HANA

  // const allTopicsData = allPostsData;

  const df = fromCSV(bitcoinData);
  const close = df.getSeries('Close').toArray();
  const date = df.getSeries('Date').toArray();

  return {
    props: {
      date,
      close,
    },
  };
}
