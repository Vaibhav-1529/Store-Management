import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '2025-08-11',
    quantity:2
  },
  {
    name: '2025-08-12',
    quantity:4

  },
  {
    name: '2025-08-13',
    quantity:1

  },
];

export default function ProductSaleChart({chartData}:any) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: data.length }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
