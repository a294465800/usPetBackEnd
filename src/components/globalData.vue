<script>

  const globalData = {
//  	url: 'https://www.sennkisystem.cn/api/',
    url: 'http://192.168.3.22:8888/api/',

    /**
     * 流水图表参数
     * */
    days: [
      '1号', '2号', '3号', '4号', '5号', '6号', '7号', '8号', '9号', '10号',
      '11号', '12号', '13号', '14号', '15号', '16号', '17号', '18号', '19号', '20号',
      '21号', '22号', '23号', '24号', '25号', '26号', '27号', '28号', '29号', '30号', '31号',
    ],
    days_count: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        position: 'left',
        text: '金额（万元）',
        fontSize: 14,
        fontStyle: 'normal',
        fontFamily: 'Microsoft YaHei'
      },
      legend: {
        position: 'right'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: true
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          },
          barThickness: 20
        }]
      },
    },
  }

  export default {
    globalData
  }
</script>
