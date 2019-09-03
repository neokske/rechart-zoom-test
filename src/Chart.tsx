import * as React from "react";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const myData = [
  { name: 1, cost: 4.11, impression: 100 },
  { name: 2, cost: 2.39, impression: 120 },
  { name: 3, cost: 1.37, impression: 150 },
  { name: 4, cost: 1.16, impression: 180 },
  { name: 5, cost: 2.29, impression: 200 },
  { name: 6, cost: 3, impression: 499 },
  { name: 7, cost: 0.53, impression: 50 },
  { name: 8, cost: 2.52, impression: 100 },
  { name: 9, cost: 1.79, impression: 200 },
  { name: 10, cost: 2.94, impression: 222 },
  { name: 11, cost: 4.3, impression: 210 },
  { name: 12, cost: 4.41, impression: 300 },
  { name: 13, cost: 2.1, impression: 50 },
  { name: 14, cost: 8, impression: 190 },
  { name: 15, cost: 0, impression: 300 },
  { name: 16, cost: 9, impression: 400 },
  { name: 17, cost: 3, impression: 200 },
  { name: 18, cost: 2, impression: 50 },
  { name: 19, cost: 3, impression: 100 },
  { name: 20, cost: 7, impression: 100 }
];

const getAxisYDomain = (
  from: number,
  to: number,
  ref: keyof typeof myData[0],
  offset: number
) => {
  const refData = myData.slice(from - 1, to);
  const refValues = refData.map(d => d[ref]);
  const bottom = Math.min(...refValues);
  const top = Math.max(...refValues);

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const StreamingDemo = () => {
  const [data, setData] = useState(myData);
  const [left, setLeft] = useState<string | number>("dataMin");
  const [right, setRight] = useState<string | number>("dataMax");
  const [refAreaLeft, setRefAreaLeft] = useState("");
  const [refAreaRight, setRefAreaRight] = useState("");
  const [top, setTop] = useState<string | number>("dataMax+1");
  const [bottom, setBottom] = useState<string | number>("dataMin-1");
  const [top2, setTop2] = useState<string | number>("dataMax+20");
  const [bottom2, setBottom2] = useState<string | number>("dataMin-20");

  const state = {
    data,
    left,
    right,
    refAreaLeft,
    refAreaRight,
    top,
    bottom,
    top2,
    bottom2
  };

  console.log("state", state);

  const handleZoom = () => {
    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setRefAreaLeft("");
      setRefAreaRight("");
      return;
    }

    const minArea = Math.min(Number(refAreaLeft), Number(refAreaRight));
    console.log("minArea", minArea);
    const maxArea = Math.max(Number(refAreaLeft), Number(refAreaRight));
    console.log("maxArea", maxArea);

    // yAxis domain
    const [bottom, top] = getAxisYDomain(minArea, maxArea, "cost", 1);
    const [bottom2, top2] = getAxisYDomain(minArea, maxArea, "impression", 50);

    setRefAreaLeft("");
    setRefAreaRight("");
    setData([...data]);
    setLeft(minArea);
    setRight(maxArea);
    setBottom(bottom);
    setTop(top);
    setBottom2(bottom2);
    setTop2(top2);
  };

  const zoomOut = () => {
    setRefAreaLeft("");
    setRefAreaRight("");
    setData([...data]);
    setLeft("dataMin");
    setRight("dataMax");
    setBottom("dataMin");
    setTop("dataMax+1");
    setBottom2("dataMax+50");
    setTop2("dataMin+50");
  };

  const handleMouseDown = (event: any) => setRefAreaLeft(event.activeLabel);
  const handleMouseMove = (event: any) =>
    refAreaLeft && setRefAreaRight(event.activeLabel);

  return (
    <div className="highlight-bar-charts">
      <button onClick={zoomOut}>Zoom Out</button>
      <p>Highlight / Zoom - able Line Chart</p>
      <LineChart
        width={800}
        height={400}
        data={data}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleZoom}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          allowDataOverflow={true}
          dataKey="name"
          domain={[left, right]}
          type="number"
        />
        <YAxis
          allowDataOverflow={true}
          domain={[bottom, top]}
          type="number"
          yAxisId="1"
        />
        <YAxis
          orientation="right"
          allowDataOverflow={true}
          domain={[bottom2, top2]}
          type="number"
          yAxisId="2"
        />
        <Tooltip />
        <Line
          yAxisId="1"
          type="natural"
          dataKey="cost"
          stroke="#8884d8"
          animationDuration={300}
        />
        <Line
          yAxisId="2"
          type="natural"
          dataKey="impression"
          stroke="#82ca9d"
          animationDuration={300}
        />

        {refAreaLeft && refAreaRight ? (
          <ReferenceArea
            yAxisId="1"
            x1={refAreaLeft}
            x2={refAreaRight}
            strokeOpacity={0.3}
          />
        ) : null}
      </LineChart>
    </div>
  );
};

export default StreamingDemo;
