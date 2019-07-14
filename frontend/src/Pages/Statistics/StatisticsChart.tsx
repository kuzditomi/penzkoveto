import React, { useEffect } from "react";
import { makeStyles, Theme, Paper, Grid, Color } from "@material-ui/core";
import { IStatistics } from "../../Models/statistics";
import * as d3 from "d3";
import * as Colors from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3),
    overflowX: "auto"
  }
}));

type StatisticsChartProps = {
  statistics: IStatistics;
};

const StatisticsChart: React.FC<StatisticsChartProps> = ({ statistics }) => {
  const classes = useStyles();

  useEffect(() => {
    var width = 150,
      height = 150,
      margin = 30;
    var radius = Math.min(width, height) / 2 - margin;

    var data = { a: 9, b: 20, c: 30, d: 8, e: 12 };
    var colors: Color[] = [
      Colors.amber,
      Colors.blue,
      Colors.green,
      Colors.indigo,
      Colors.lime
    ];
    var colorCodes = colors.map(c => c[800]);
    var color = d3
      .scaleOrdinal()
      .domain(data as any)
      .range(colorCodes);

    var pie = d3.pie().value((d: any) => d.value);
    var data_ready = pie(d3.entries(data as any) as any);

    const chart = d3
      .select("#stat-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    chart
      .selectAll("whatever")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius) as any)
      .attr("fill", (d: any) => color(d.data.key) as any)
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .on("mouseover", (d, i) => {
        chart.append("text").text(i);
      })
      .on("mouseleave", (d, i) => {
        // d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();
      });
    //     .value(d => d.value)
    // var data_ready = pie(d3.entries(data))
  });

  const data = { a: 9, b: 20, c: 30, d: 8, e: 12 };

  return (
    <Grid item xs={12} sm={6}>
      <Paper className={classes.root}>
        <div id="stat-chart" className="container" />
      </Paper>
    </Grid>
  );
};

export default StatisticsChart;
