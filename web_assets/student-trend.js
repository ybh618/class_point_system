document.addEventListener('DOMContentLoaded', () => {
  const dataElement = document.getElementById('studentTrendData')
  const chartCanvas = document.getElementById('trendChart')
  if (!dataElement || !(chartCanvas instanceof HTMLCanvasElement)) {
    return
  }

  const payload = JSON.parse(dataElement.textContent || '{}')
  const trendData = payload.trend_data || []
  const classAvgData = payload.class_avg_data || []
  const classQ1Data = payload.class_q1_data || []
  const classQ3Data = payload.class_q3_data || []
  const classMedianData = payload.class_median_data || []

  const bootChart = () => {
    const context = chartCanvas.getContext('2d')
    if (!context) {
      return
    }

    new Chart(context, {
      type: 'line',
      data: {
        labels: trendData.map((d) => d.date),
        datasets: [
          {
            label: '个人累计积分',
            data: trendData.map((d) => d.cumulative),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            tension: 0.4,
            fill: true,
            borderWidth: 3,
          },
          {
            label: '班级平均分',
            data: classAvgData.map((d) => d.avg),
            borderColor: 'rgb(255, 159, 64)',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            borderDash: [5, 5],
          },
          {
            label: '上四分位数',
            data: classQ3Data.map((d) => d.q3),
            borderColor: 'rgb(153, 102, 255)',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 1,
            borderDash: [3, 3],
          },
          {
            label: '中位数',
            data: classMedianData.map((d) => d.median),
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            borderDash: [5, 5],
          },
          {
            label: '下四分位数',
            data: classQ1Data.map((d) => d.q1),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 1,
            borderDash: [3, 3],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label(context) {
                return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}分`
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: '积分',
            },
          },
          x: {
            title: {
              display: true,
              text: '日期',
            },
          },
        },
      },
    })
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(bootChart, { timeout: 1200 })
  } else {
    window.setTimeout(bootChart, 0)
  }
})
