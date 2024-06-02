import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBagShopping, faBook, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import ReactFrappeChart from 'react-frappe-charts';
import './HomeStyle.css';
const generateFakeMonthlyData = () => {
    const data = [];
    for (let i = 0; i < 5; i++) {
        const month = i + 1;
        const revenue = Math.floor(Math.random() * 10000) + 1000; // Doanh thu ngẫu nhiên từ 1000 đến 11000
        data.push({ month, revenue });
    }
    return data;
};
const generateFakeVisitData = () => {
    const data = [];
    for (let i = 1; i <= 31; i++) {
        const date = i < 10 ? `0${i}/05` : `${i}/05`;
        const visits = Math.floor(Math.random() * 1000) + 50; // Số lượt ghé thăm ngẫu nhiên từ 50 đến 1050
        data.push({ date, visits });
    }
    return data;
};
// Hàm tính phần trăm doanh thu của từng tháng
const calculateRevenuePercentages = (data) => {
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    return data.map((item) => ({
        ...item,
        percentage: ((item.revenue / totalRevenue) * 100).toFixed(2),
    }));
};

// Component Biểu Đồ
const RevenueChart = ({ data }) => {
    const chartData = {
        labels: data.map((item) => `Tháng ${item.month}`),
        datasets: [
            {
                name: 'Doanh thu',
                type: 'pie',
                values: data.map((item) => item.percentage),
            },
        ],
    };

    return (
        <>
            <h2 className="text-xl">Phần trăm doanh thu từng tháng</h2>
            <ReactFrappeChart type="pie" data={chartData} height={250} />
        </>
    );
};
const VisitChart = ({ data }) => {
    const chartData = {
        labels: data.map((item) => item.date),
        datasets: [
            {
                name: 'Lượt ghé thăm',
                type: 'line',
                values: data.map((item) => item.visits),
            },
        ],
    };

    return (
        <>
            {/* <div> */}
            <h2>Số lượt ghé thăm theo ngày trong tháng 5</h2>
            <ReactFrappeChart
                type="line"
                data={chartData}
                height={250}
                lineOptions={{ regionFill: 1 }} // Tùy chọn để tô màu vùng dưới đường
                className="custom-chart"
            />

            {/* </div> */}
        </>
    );
};
function HomePage() {
    const chartRef = useRef();
    const [revenueData, setRevenueData] = useState([]);

    useEffect(() => {
        const data = generateFakeMonthlyData();
        const dataWithPercentages = calculateRevenuePercentages(data);
        setRevenueData(dataWithPercentages);
    }, []);
    const exportChart = () => {
        if (chartRef && chartRef.current) {
            chartRef.current.export();
        }
    };
    const [visitData, setVisitData] = useState([]);

    useEffect(() => {
        const data = generateFakeVisitData();
        setVisitData(data);
    }, []);
    const ItemData = ({ icon, name, quantity, bgColor }) => {
        return (
            <div
                className={`flex items-center shadow-sm gap-4 px-2 py-2 w-full text-white rounded-md `}
                style={{ backgroundColor: bgColor }}
            >
                <FontAwesomeIcon icon={icon} className="text-3xl m-4" />
                <div className="flex flex-col">
                    <p className="text-2xl">{name}</p>
                    <p className="text-2xl">{quantity}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="px-10 py-5 bg-[#FBFBFB] h-screen">
            <div>
                <h1 className="text-3xl">Trang chủ</h1>
            </div>
            <div className="flex justify-between gap-8 my-5">
                <ItemData icon={faBook} name="Sách" quantity="1000" bgColor={`#9593FE`} />
                <ItemData icon={faUser} name="Người dùng" quantity="1000" bgColor={`#54C7E8`} />
                <ItemData icon={faBagShopping} name="Đơn đặt hàng" quantity="1000" bgColor={`#5CDAB4`} />
                <ItemData icon={faMoneyBill} name="Tổng tiền" quantity="1000" bgColor={`#FE7976`} />
            </div>

            <div className="flex gap-4 justify-between ">
                <div className=" w-1/2  rounded-md bg-white p-4 shadow-md">
                    <h2 className="text-xl">Số lượng bán trong tuần</h2>
                    <ReactFrappeChart
                        ref={chartRef}
                        type="bar"
                        colors={['#21ba45']}
                        axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: 1 }}
                        height={250}
                        data={{
                            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            datasets: [{ values: [18, 40, 30, 35, 8, 52, 17, 4] }],
                        }}
                    />
                </div>
                <div className=" w-1/2  rounded-md bg-white p-4 shadow-md">
                    <RevenueChart data={revenueData} />
                </div>
            </div>
            <div className=" w-full  rounded-md bg-white p-4 shadow-md">
                <VisitChart data={visitData} />
            </div>
        </div>
    );
}

export default HomePage;
