import React from 'react';
import { VictoryChart, VictoryStack, VictoryBar, VictoryAxis, VictoryLegend } from 'victory';

const emotionsToDataset = (emotions) => {
  if (!emotions || emotions.length === 0) {
    return [];
  }

  const emotionKeys = Object.keys(emotions[0]);
  const dataset = emotionKeys.map((key) =>
    emotions.map((emotion, i) => ({ x: String.fromCharCode(97 + i), y: emotion[key] }))
  );

  return dataset;
};

const HomePageGraph2 = ({ artworks }) => {
  const emotions = artworks.map((artwork) => artwork.emotion);
  const dataset = emotionsToDataset(emotions);

  console.log(emotions[0])

  if (!dataset || dataset.length === 0 || !dataset[0]) {
    return <div>No data to display.</div>;
  }

  const colorScale = ["yellow", "blue", "orange", "purple", "gray"];

  const legendData = colorScale.map((color, index) => ({
    name: `${Object.keys(emotions[0])[index]}`,
    symbol: { fill: color },
  }));

  return (
    <div className="w-1/2">
      <VictoryChart height={400} width={600} domainPadding={{ x: 60, y: 0 }}>
        <VictoryStack colorScale={colorScale}>
          {dataset.map((data, i) => (
            <VictoryBar data={data} key={i} labels={({ datum }) => `${datum.y.toFixed(2)}%`} />
          ))}
        </VictoryStack>
        <VictoryAxis tickFormat={() => ''} />
        <VictoryAxis tickFormat={["1", "2", "3", "4"]} />
        <VictoryLegend
          x={510}
          title="Emotions"
          centerTitle
          orientation="vertical"
          gutter={20}
          style={{ title: { fontSize: 16 } }}
          data={legendData}
        />
      </VictoryChart>
    </div>
  );
}

export default HomePageGraph2;
