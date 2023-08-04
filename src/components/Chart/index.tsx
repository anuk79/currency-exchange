import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { DEFAULT_CHARTLINE_COLOR } from "../../utils/constants";

interface ChartProps {
  data: number[];
  label: string;
  lineColor?: string;
}

const Chart: React.FC<ChartProps> = ({
  data,
  lineColor = DEFAULT_CHARTLINE_COLOR,
  label,
}) => {
  return (
    <section>
      <Sparklines data={data}>
        <SparklinesLine color={lineColor} />
      </Sparklines>
      <div className="chart-labels">{label}</div>
    </section>
  );
};

export default Chart;
