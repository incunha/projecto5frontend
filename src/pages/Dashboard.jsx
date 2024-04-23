import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useUserStore from '../../userStore';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const { userStatistics, fetchUserStatistics, token } = useUserStore();

  useEffect(() => {
    if (token) {
      fetchUserStatistics(token);
    }
  }, [token, fetchUserStatistics]);

  const userStats = userStatistics && [
    { name: 'Total Users', value: userStatistics.totalUsers || 0 },
    { name: 'Confirmed Users', value: userStatistics.totalConfirmedusers || 0 },
    { name: 'Unconfirmed Users', value: userStatistics.totalUnconfirmedUsers || 0 },
    { name: 'Blocked Users', value: userStatistics.totalBlockedUsers || 0 },
  ].filter(stat => stat.value > 0);

  const confirmedUsersByDate = userStatistics && userStatistics.confirmedUsersByDate && Object.entries(userStatistics.confirmedUsersByDate).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div>
      {userStats && userStats.length > 0 && (
        <PieChart width={600} height={600}>
          <Pie
            data={userStats}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {userStats.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      )}

      {confirmedUsersByDate && confirmedUsersByDate.length > 0 && (
        <LineChart
          width={500}
          height={300}
          data={confirmedUsersByDate}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      )}
    </div>
  );
};

export default Dashboard;