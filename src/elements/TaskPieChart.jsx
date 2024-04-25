import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class TaskPieChart extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const taskTotals = this.props.taskTotals || [];
    const data = [
      { name: 'Total Tasks', value: taskTotals[0] || 0 },
      { name: 'To Do Tasks', value: taskTotals[1] || 0 },
      { name: 'Doing Tasks', value: taskTotals[2] || 0 },
      { name: 'Done Tasks', value: taskTotals[3] || 0 },
    ];
  
    return (
<div>
  <PieChart width={400} height={250}>
    <Pie
      activeIndex={this.state.activeIndex}
      activeShape={renderActiveShape}
      data={data.length > 0 ? data : [{name: 'No tasks', value: 1}]}
      cx="50%"
      cy="50%"
      innerRadius={40}
      outerRadius={50}
      fill="#8884d8"
      dataKey="value"
      onMouseEnter={this.onPieEnter}
    >
      {
        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
      }
    </Pie>
  </PieChart>
  <div>
    {data.length > 0 ? data.map((item, index) => (
      <div key={index} style={{textAlign: 'right', paddingRight: '20px', fontSize: '10px'}}>
        <span style={{color: COLORS[index % COLORS.length]}}>{item.name}: </span>
        <span>{item.value}</span>
      </div>
    )) : <div style={{textAlign: 'right', paddingRight: '20px', fontSize: '10px'}}>No tasks</div>}
  </div>
</div>
  );
  }
}