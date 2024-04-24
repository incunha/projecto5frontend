import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import useUserStore from '../../userStore';
import useTaskStore from '../../taskStore';
import Header from '../components/header/header';
import Sidebar from '../components/sideBar/sideBar';
import { useDashboardSocket } from '../websocket/Dashboard';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
    const { userStatistics, fetchUserStatistics, token } = useUserStore();
    const { taskStatistics, fetchTaskStatistics } = useTaskStore();
    const [message, setMessage] = useState(null);
  
    useDashboardSocket(setMessage);
  
    useEffect(() => {
      if (token) {
        fetchUserStatistics(token);
        fetchTaskStatistics(token);
      }
    }, []);
  
    useEffect(() => {
      if (message === 'ping') {
        fetchUserStatistics(token);
        fetchTaskStatistics(token);
      }
    }, [message]);

  

  //estatisticas dos users

  const userStats = userStatistics && [
    { name: 'Total Users', value: userStatistics.totalUsers || 0 },
    { name: 'Confirmed Users', value: userStatistics.totalConfirmedusers || 0 },
    { name: 'Unconfirmed Users', value: userStatistics.totalUnconfirmedUsers || 0 },
    { name: 'Blocked Users', value: userStatistics.totalBlockedUsers || 0 },
  ];

  
  const pieData = userStats ? userStats.filter(stat => stat.value > 0) : [];

  const confirmedUsersByDate = userStatistics && userStatistics.confirmedUsersByDate && Object.entries(userStatistics.confirmedUsersByDate)
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));


    //estatisticas das tasks
    const totalTasks = taskStatistics ? taskStatistics.totalTasks : 0;
    const totalDoneTasks = taskStatistics ? taskStatistics.totaDoneTasks : 0;
    const totalDoingTasks = taskStatistics ? taskStatistics.totalDoingTasks : 0;
    const totalToDoTasks = taskStatistics ? taskStatistics.totalToDoTasks : 0;
    const averageTasksPerUser = taskStatistics ? taskStatistics.averageTasksPerUser : 0;

    const taskStats = taskStatistics && [
        { name: 'Done Tasks', value: taskStatistics.totaDoneTasks || 0 },
        { name: 'Doing Tasks', value: taskStatistics.totalDoingTasks || 0 },
        { name: 'To Do Tasks', value: taskStatistics.totalToDoTasks || 0 },
      ];
      
      const pieDataTasks = taskStatistics ? Object.entries(taskStatistics.tasksByCategory).map(([name, value]) => ({ name, value })) : [];
      const tasksCompletedByDate = taskStatistics 
      ? Object.entries(taskStatistics.tasksCompletedByDate)
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => new Date(a.date) - new Date(b.date))
      : [];
  
     const tasksByCategory = taskStatistics && taskStatistics.tasksByCategory 
      ? Object.entries(taskStatistics.tasksByCategory)
          .map(([category, count]) => ({ category, count }))
          .sort((a, b) => b.count - a.count)
      : [];


      return (
        <div>
          <Header /> 
          <div style={{ display: 'flex' }}>
          <Sidebar /> 
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              {userStats && userStats.length > 0 && (
                <div style={{ flex: '1 0 400px', margin: '1rem' }}>
                <h2 style={{ fontSize: '1rem' }}>User Statistics</h2> {/* Move the title here */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <PieChart width={250} height={270}>
                    <Pie
                    data={pieData}
                    cx={150}
                    cy={150}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                    >
                    {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    </PieChart>
                <div style={{ paddingLeft: '50px' }}> 
                {userStats.map((entry, index) => (
                <div key={index} style={{ color: COLORS[index % COLORS.length] }}>
                <span style={{ display: 'inline-block', width: '10px', height: '10px', marginRight: '5px' }}></span>
                {entry.name}: {entry.value}
                </div>
            ))}
             </div>
            </div>
          </div>
        )}
            {confirmedUsersByDate && confirmedUsersByDate.length > 0 && (
                <div style={{ flex: '1 0 300px', margin: '1rem' }}>
                <h2 style={{ fontSize: '1rem' }}>Registered Users By Date</h2>
                <LineChart
                width={450}
                height={250}
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
                  </div>
                )}
              </div>

              
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
  <div className="statistics-container" style={{ maxWidth: '200px', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
    <p style={{ fontSize: '0.8rem' }}>Average tasks per user: {averageTasksPerUser}</p>
    <p style={{ fontSize: '0.8rem' }}>Total tasks: {totalTasks}</p>
    <p style={{ fontSize: '0.8rem' }}>Tasks in "DONE": {totalDoneTasks}</p>
    <p style={{ fontSize: '0.8rem' }}>Tasks in "DOING": {totalDoingTasks}</p>
    <p style={{ fontSize: '0.8rem' }}>Tasks in "TO DO": {totalToDoTasks}</p>
  </div>
  <div style={{ flex: '1 0 300px', margin: '1rem' }}>

              <h2 style={{ fontSize: '1rem' }}>Task Statistics</h2>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {tasksByCategory && tasksByCategory.length > 0 && (
  <BarChart
    width={400}
    height={200}
    data={tasksByCategory}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="category" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#8884d8" />
  </BarChart>
)}
          
                {tasksCompletedByDate && tasksCompletedByDate.length > 0 && (
                  <div>
                    <h2 style={{ fontSize: '1rem' }}>Tasks Completed By Date</h2>
                    <LineChart
                      width={400}
                      height={200}
                      data={tasksCompletedByDate}
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
                  </div>
                )}
              </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            
          );
};

export default Dashboard;