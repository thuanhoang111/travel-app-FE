import { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const barChartOptions = {
   chart: {
      type: 'bar',
      height: 365,
      toolbar: {
         show: false,
      },
   },
   plotOptions: {
      bar: {
         columnWidth: '45%',
         borderRadius: 4,
      },
   },
   dataLabels: {
      enabled: false,
   },
   xaxis: {
      categories: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
      axisBorder: {
         show: false,
      },
      axisTicks: {
         show: false,
      },
   },
   yaxis: {
      show: false,
   },
   grid: {
      show: false,
   },
};

const MonthlyBarChart = () => {
   const theme = useTheme();

   const { primary, secondary } = theme.palette.text;
   const info = theme.palette.info.light;

   const [series, setSeries] = useState([
      {
         data: [0, 0, 0, 0, 0, 0, 0],
      },
   ]);

   const [options, setOptions] = useState(barChartOptions);

   const formatCurrency = (value) => {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}bookings/weekly`);
            const data = await response.json();

            setSeries([
               {
                  data: [
                     data.MONDAY,
                     data.TUESDAY,
                     data.WEDNESDAY,
                     data.THURSDAY,
                     data.FRIDAY,
                     data.SATURDAY,
                     data.SUNDAY,
                  ],
               },
            ]);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchData();
   }, []);

   useEffect(() => {
      setOptions((prevState) => ({
         ...prevState,
         colors: [info],
         xaxis: {
            labels: {
               style: {
                  colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary],
               },
            },
         },
         tooltip: {
            theme: 'light',
            y: {
               formatter: (value) => formatCurrency(value),
            },
         },
      }));
   }, [primary, info, secondary]);

   return (
      <div id="chart">
         <ReactApexChart options={options} series={series} type="bar" height={365} />
      </div>
   );
};

export default MonthlyBarChart;
