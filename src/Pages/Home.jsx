import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactFrappeChart from 'react-frappe-charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser, faBagShopping, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../Layouts/Components/themeProvider';

// Sample datacategory

const generateFakeVisitData = () => {
    const data = [];
    for (let i = 1; i <= 31; i++) {
        const date = i < 10 ? `0${i}/05` : `${i}/05`;
        const visits = Math.floor(Math.random() * 1000) + 50; // Số lượt ghé thăm ngẫu nhiên từ 50 đến 1050
        data.push({ date, visits });
    }
    return data;
};

const RevenueChart = ({ data }) => {
    const chartData = React.useMemo(
        () => ({
            labels: data.map((item) => item.name),
            datasets: [
                {
                    name: 'Doanh thu',
                    type: 'pie',
                    values: data.map((item) => item.percentage),
                },
            ],
        }),
        [data],
    );

    return (
        <>
            <h2 className="text-xl">Phần trăm doanh thu theo danh mục</h2>
            <ReactFrappeChart type="pie" data={chartData} height={300} />
        </>
    );
};

const VisitChart = ({ data }) => {
    const chartData = React.useMemo(
        () => ({
            labels: data.map((item) => item.date),
            datasets: [
                {
                    name: 'Lượt ghé thăm',
                    type: 'line',
                    values: data.map((item) => item.visits),
                },
            ],
        }),
        [data],
    );

    return (
        <>
            <h2>Số lượt ghé thăm theo ngày trong tháng 5</h2>
            <ReactFrappeChart
                type="line"
                data={chartData}
                height={250}
                lineOptions={{ regionFill: 1 }} // Tùy chọn để tô màu vùng dưới đường
                className="custom-chart"
            />
        </>
    );
};

function HomePage() {
    const { isReload } = useTheme();
    const chartRef = useRef(null);
    const [revenueData, setRevenueData] = useState([]);
    const [dataPayment, setDataPayment] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [quantityUser, setQuantityUser] = useState();
    const [quantityProduct, setQuantityProduct] = useState();
    const [quantityOrder, setQuantityOrder] = useState();
    const [totalPrices, setTotalPrices] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [visitData, setVisitData] = useState([]);
    const [categoryAllIds, setCategoryAllIds] = useState([]);
    const [weeklySales, setWeeklySales] = useState(Array(7).fill(0));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productResponse, paymentResponse, categoryResponse, userResponse] = await Promise.all([
                    axios.get('https://backend-book-store-two.vercel.app/product'),
                    axios.get('https://backend-book-store-two.vercel.app/payment'),
                    axios.get('https://backend-book-store-two.vercel.app/categoryAll'),
                    axios.get('https://backend-book-store-two.vercel.app/user'),
                ]);

                setDataProduct(productResponse.data);
                setDataPayment(paymentResponse.data);
                setDataCategory(categoryResponse.data);
                setQuantityUser(userResponse.data.length);
                setQuantityProduct(productResponse.data.length);
                setIsLoading(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (isLoading) {
            const productIds = dataPayment.flatMap((order) => order.products.map((product) => product.productId));

            const matchingProducts = dataProduct.filter((product) => productIds.includes(product._id));
            const extractedCategoryAllIds = matchingProducts.map((product) => product.categoryAllId);
            setCategoryAllIds(extractedCategoryAllIds);

            const categoryCounts = extractedCategoryAllIds.reduce((acc, categoryId) => {
                acc[categoryId] = (acc[categoryId] || 0) + 1;
                return acc;
            }, {});

            // total sales revenue
            const totalProductsSold = extractedCategoryAllIds.length;

            const revenueData = dataCategory.map((category) => {
                const count = categoryCounts[category._id] || 0;
                const percentage = ((count / totalProductsSold) * 100).toFixed(2);
                return {
                    name: category.name,
                    percentage: parseFloat(percentage),
                };
            });

            setRevenueData(revenueData);
            //Number of orders
            const totalRevenue = dataPayment
                .filter(
                    (order) =>
                        order.orderStatus !== 'Hủy đơn' &&
                        order.orderStatus !== 'Đã đặt hàng' &&
                        order.orderStatus !== 'Đã thanh toán',
                )
                .reduce((sum, order) => sum + order.totalPrice, 0);
            setTotalPrices(totalRevenue);

            const pendingPaymentsCount = dataPayment.filter(
                (order) =>
                    order.orderStatus !== 'Hủy đơn' &&
                    order.orderStatus !== 'Đã giao hàng' &&
                    order.orderStatus !== 'Giao hàng thành công',
            ).length;
            setQuantityOrder(pendingPaymentsCount);

            // Quantity sold during the week
            const currentWeekSales = Array(7).fill(0);
            const today = new Date();
            const startOfWeek = today.getDate() - today.getDay();

            dataPayment.forEach((order) => {
                const orderDate = new Date(order.createdAt);
                if (order.orderStatus !== 'Hủy đơn' && orderDate >= new Date(today.setDate(startOfWeek))) {
                    const dayOfWeek = orderDate.getDay();
                    currentWeekSales[dayOfWeek] += 1;
                }
            });

            setWeeklySales(currentWeekSales);
        }
    }, [isLoading, dataPayment, dataProduct, dataCategory]);

    useEffect(() => {
        const data = generateFakeVisitData();
        setVisitData(data);
    }, []);

    const exportChart = () => {
        if (chartRef.current) {
            chartRef.current.export();
        }
    };

    const ItemData = ({ icon, name, quantity, bgColor }) => (
        <div
            className={`flex items-center shadow-sm gap-4 px-2 py-2 w-full text-white rounded-md`}
            style={{ backgroundColor: bgColor }}
        >
            <FontAwesomeIcon icon={icon} className="text-3xl m-4" />
            <div className="flex flex-col">
                <p className="text-2xl">{name}</p>
                <p className="text-2xl">{quantity}</p>
            </div>
        </div>
    );
    function formatNumber(number) {
        return number.toLocaleString('de-DE') + 'đ';
    }
    return (
        <div className="px-10 py-5 bg-[#FBFBFB] h-screen">
            <div>
                <h1 className="text-3xl">Trang chủ</h1>
            </div>
            <div className="flex justify-between gap-8 my-5">
                <ItemData
                    icon={faBook}
                    name="Sách"
                    quantity={quantityProduct ? quantityProduct : '1000'}
                    bgColor="#9593FE"
                />
                <ItemData icon={faUser} name="Người dùng" quantity="99" bgColor="#54C7E8" />
                <ItemData
                    icon={faBagShopping}
                    name="Đơn đặt hàng"
                    quantity={quantityOrder ? quantityOrder : '1000'}
                    bgColor="#5CDAB4"
                />
                <ItemData
                    icon={faMoneyBill}
                    name="Tổng doanh thu"
                    quantity={totalPrices ? formatNumber(totalPrices) : formatNumber(1000000)}
                    bgColor="#FE7976"
                />
            </div>
            <div className="flex gap-4 justify-between ">
                <div className="w-1/2 rounded-md bg-white p-4 shadow-md ">
                    <h2 className="text-xl">Số lượng bán trong tuần</h2>
                    <ReactFrappeChart
                        ref={chartRef}
                        type="bar"
                        colors={['#21ba45']}
                        axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: 1 }}
                        height={300}
                        data={{
                            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            datasets: [{ values: weeklySales }],
                        }}
                    />
                </div>
                <div className="w-1/2 rounded-md bg-white p-4 shadow-md">
                    <RevenueChart data={revenueData} />
                </div>
            </div>
            <div className="w-full rounded-md bg-white p-4 shadow-md">
                <VisitChart data={visitData} />
            </div>
        </div>
    );
}

export default HomePage;
