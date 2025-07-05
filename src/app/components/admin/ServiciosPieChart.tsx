"use client"

import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend)

interface ServiciosPieChartProps {
  data: {
    labels: string[]
    values: number[]
  }
}

export default function ServiciosPieChart({ data }: ServiciosPieChartProps) {
  if (!data) return <p>Cargando gráfico...</p>

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF',
        ],
      },
    ],
  }

  return (
    <div style={{ maxWidth: 400 }}>
      <Pie data={chartData} />
    </div>
  )
}
