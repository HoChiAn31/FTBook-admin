import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Form, FormField, FormGroup, TextArea } from 'semantic-ui-react';
import FormFieldComponent from '../../Components/FormFieldComponent';
import axios from 'axios';
import { dataYearOfManufacture } from '../../Layouts/Components/data';
import { CircleCheck } from 'lucide-react';
function BookEditPage() {
    const [dataPublish, setDataPublish] = useState([]);
    const [dataSupplier, setDataSupplier] = useState([]);
    const [dataCategoryAll, setDataCategoryAll] = useState([]);
    const [dataCatgoryDetail, setDataCatgoryDetail] = useState([]);
    const [dataYear, setDataYear] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const { dataDetailBook } = location.state;
    console.log(dataDetailBook._id);
    // --------------------------value declaration--------------------------------------
    const [valueName, setValueName] = useState(dataDetailBook.name);
    const [valueAuthor, setValueAuthor] = useState(dataDetailBook.author);
    const [valueQuantity, setValueQuantity] = useState(dataDetailBook.quantity);
    const [valueForm, setValueForm] = useState(dataDetailBook.form);
    const [valuePublished, setValuePublished] = useState(dataDetailBook.categoryPublishId);
    const [valueSupplier, setValueSupplier] = useState(dataDetailBook.categorySupplierId);
    const [selectedCategoryAll, setSelectedCategoryAll] = useState(dataDetailBook.categoryAllId);
    const [filteredCategoryDetailOptions, setFilteredCategoryDetailOptions] = useState([]);
    const [valueCatagoryDetail, setValueCatagoryDetail] = useState(dataDetailBook.categoryDetailId);
    const [valueYear, setValueYear] = useState(dataDetailBook.categoryYearId);
    const [valuePriceImport, setValuePriceImport] = useState(dataDetailBook.priceImport);
    const [valuePriceSell, setValuePriceSell] = useState(dataDetailBook.priceSell);
    const [valuePriceDiscount, setValuePriceDiscount] = useState(dataDetailBook.priceDiscount);
    const [valueLanguage, setValueLanguage] = useState(dataDetailBook.language);
    const [valueYearOfManufacture, setValueYearOfManufacture] = useState(dataDetailBook.yearOfManufacture);
    const [valueSize, setValueSize] = useState(dataDetailBook.size);
    const [valueQuantityPage, setValueQuantityPage] = useState(dataDetailBook.pageQuantity);
    const [valueDescription, setValueDescription] = useState(dataDetailBook.description);
    const [showNotification, setShowNotification] = useState(false);
    const loadDataPublish = () => {
        axios
            .get('https://backend-book-store-two.vercel.app/categoryPublish')
            .then((res) => {
                setDataPublish(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const loadDataSupplier = () => {
        axios
            .get('https://backend-book-store-two.vercel.app/categorySupplier')
            .then((res) => {
                setDataSupplier(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const loadCategoryAll = () => {
        axios
            .get('https://backend-book-store-two.vercel.app/categoryAll')
            .then((res) => {
                setDataCategoryAll(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const loadCategoryDetail = () => {
        axios
            .get('https://backend-book-store-two.vercel.app/categoryDetail')
            .then((res) => {
                setDataCatgoryDetail(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const loadDateYear = () => {
        axios
            .get('https://backend-book-store-two.vercel.app/categoryYear')
            .then((res) => {
                setDataYear(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    useEffect(() => {
        loadDataPublish();
        loadDataSupplier();
        loadCategoryAll();
        loadCategoryDetail();
        loadDateYear();
    }, []);
    const form = [
        { key: 'soft', text: 'Mềm', value: 'soft' },
        { key: 'hard', text: 'Cứng', value: 'hard' },
    ];

    const dataLanguage = [
        { key: 'vn', text: 'Tiếng Việt', value: 'vn' },
        { key: 'us', text: 'Tiếng Anh', value: 'us' },
    ];

    // --------------------------number attributes--------------------------------------
    const handleChangeValueName = (event, data) => {
        setValueName(data.value);
    };
    const handleChangeValueAuthor = (event, data) => {
        setValueAuthor(data.value);
    };
    const handleChangeQuantity = (e) => {
        const newValue = e.target.value.replace(/\D/g, '');
        setValueQuantity(newValue);
    };
    const handleChangePriceImport = (e) => {
        const newValue = e.target.value.replace(/\D/g, '');
        setValuePriceImport(newValue);
    };
    const handleChangePriceSell = (e) => {
        const newValue = e.target.value.replace(/\D/g, '');
        setValuePriceSell(newValue);
    };
    const handleChangePriceDiscount = (e) => {
        const newValue = e.target.value.replace(/\D/g, '');
        setValuePriceDiscount(newValue);
    };
    const handleChangeQuantityPage = (e) => {
        const newValue = e.target.value.replace(/\D/g, '');
        setValueQuantityPage(newValue);
    };
    const convertToOptions = (data) => {
        return data.map((item) => ({
            key: item._id,
            value: item._id,
            text: item.name,
        }));
    };
    const handeleChangeValueForm = (event, data) => {
        setValueForm(data.value);
    };
    const handeleChangeValuePublished = (event, data) => {
        setValuePublished(data.value);
    };
    const handeleChangeValueSupplier = (event, data) => {
        setValueSupplier(data.value);
    };

    const handleCategoryAllChange = (event, data) => {
        setSelectedCategoryAll(data.value);
        const filteredOptions = dataCatgoryDetail.filter((option) => option.categoryAll_Id === data.value);
        setFilteredCategoryDetailOptions(convertToOptions(filteredOptions));
    };
    const handleChangeCategoryDetail = (event, data) => {
        setValueCatagoryDetail(data.value);
    };
    const handleChangeYear = (event, data) => {
        setValueYear(data.value);
    };
    const handleChangeValueLanguage = (event, data) => {
        setValueLanguage(data.value);
    };
    const handleChangeValueYearOfManufacture = (event, data) => {
        setValueYearOfManufacture(data.value);
    };

    const handleChangeValueSize = (event, data) => {
        setValueSize(data.value);
    };
    const handeleChangeValueDescription = (event, data) => {
        setValueDescription(data.value);
    };
    const handleUpdataProduct = () => {
        const updateData = {
            name: valueName,
            categoryAllId: selectedCategoryAll,
            categoryDetailId: valueCatagoryDetail,
            categorySupplierId: valueSupplier,
            categoryPublishId: valuePublished,
            categoryYearId: valueYear,
            priceImport: valuePriceImport,
            priceSell: valuePriceSell,
            priceDiscount: valuePriceDiscount,
            language: valueLanguage,
            author: valueAuthor,
            form: valueForm,
            pageQuantity: valueQuantityPage,
            description: valueDescription,
        };
        console.log(updateData);
        axios
            .patch(`https://backend-book-store-two.vercel.app/product/${dataDetailBook._id}`, updateData)
            .then((response) => {
                // handle the response
                console.log('Response:', response.data);
                setShowNotification(true); // Hiển thị thông báo
                setTimeout(() => {
                    setShowNotification(false); // Hide the notification
                    window.history.back(); // Navigate back to the previous page
                }, 800);
            })
            .catch((error) => {
                // handle any errors
                console.error('There was an error making the request:', error);
            });
    };
    return (
        <div className="p-5">
            <div className="flex items-center justify-between fixed top-0 left-0 right-0 bg-white z-50 py-4  pl-[18%] shadow-md  ">
                <h3 className="font-bold text-4xl">Chi tiết sách</h3>
                <div>
                    <Button primary onClick={handleUpdataProduct}>
                        Cập nhật
                    </Button>
                    <Link to="/book">
                        <Button color="red">Hủy</Button>
                    </Link>
                </div>
            </div>
            <div className="mb-5 py-16">
                <Form size="large">
                    {/* ----------------------- */}
                    <FormFieldComponent
                        title="Tên sách"
                        placeholder="Nhập tên sách"
                        required
                        value={valueName}
                        onChange={handleChangeValueName}
                    />
                    <FormFieldComponent
                        title="Tác giả"
                        placeholder="Nhập tên tác giả"
                        required
                        value={valueAuthor}
                        onChange={handleChangeValueAuthor}
                    />
                    {/* ----------------------- */}
                    <FormGroup widths={2}>
                        <FormFieldComponent
                            title="Số lượng"
                            placeholder="Nhập số lượng"
                            value={valueQuantity}
                            required
                            onChange={handleChangeQuantity}
                        />
                        <FormFieldComponent
                            title="Hình thức sản phẩm"
                            placeholder="Chọn hình thức"
                            required
                            select
                            value={valueForm}
                            options={form}
                            onChange={handeleChangeValueForm}
                        />
                    </FormGroup>
                    {/* ----------------------- */}
                    <FormGroup widths={2}>
                        <FormFieldComponent
                            title="Nhà xuất bản"
                            placeholder="Chọn nhà xuất bản"
                            required
                            select
                            options={convertToOptions(dataPublish)}
                            onChange={handeleChangeValuePublished}
                            value={valuePublished}
                        />
                        <FormFieldComponent
                            title="Nhà cung cấp"
                            placeholder="Chọn nhà cung cấp"
                            required
                            select
                            options={convertToOptions(dataSupplier)}
                            onChange={handeleChangeValueSupplier}
                            value={valueSupplier}
                        />
                    </FormGroup>
                    {/* ----------------------- */}
                    <FormGroup widths={2}>
                        <FormFieldComponent
                            title="Danh mục"
                            placeholder="Chọn danh mục"
                            required
                            select
                            options={convertToOptions(dataCategoryAll)}
                            onChange={handleCategoryAllChange}
                            value={selectedCategoryAll}
                        />
                        <FormFieldComponent
                            title="Danh mục chi tiết"
                            placeholder="Chọn danh mục chi tiết"
                            required
                            select
                            options={filteredCategoryDetailOptions}
                            onChange={handleChangeCategoryDetail}
                            value={valueCatagoryDetail}
                        />
                    </FormGroup>
                    {/* ----------------------- */}
                    <FormGroup widths={2}>
                        <FormFieldComponent
                            title="Độ tuổi"
                            placeholder="Chọn độ tuổi"
                            required
                            select
                            options={convertToOptions(dataYear)}
                            onChange={handleChangeYear}
                            value={valueYear}
                        />
                    </FormGroup>
                    {/* ----------------------- */}
                    <FormGroup widths={3}>
                        <FormFieldComponent
                            title="Giá nhập"
                            placeholder="Nhập giá"
                            required
                            onChange={handleChangePriceImport}
                            value={valuePriceImport}
                        />
                        <FormFieldComponent
                            title="Giá bán"
                            placeholder="Nhập giá"
                            required
                            onChange={handleChangePriceSell}
                            value={valuePriceSell}
                        />
                        <FormFieldComponent
                            title="Giá giảm"
                            placeholder="Nhập giá"
                            required
                            onChange={handleChangePriceDiscount}
                            value={valuePriceDiscount}
                        />
                    </FormGroup>
                    {/* ----------------------- */}
                    <FormGroup widths={2}>
                        <FormFieldComponent
                            title="Ngôn ngữ sách"
                            placeholder="Nhập ngôn ngữ"
                            required
                            select
                            options={dataLanguage}
                            onChange={handleChangeValueLanguage}
                            value={valueLanguage}
                        />
                        <FormFieldComponent
                            title="Năm sản xuất"
                            placeholder="Nhập năm sản xuất"
                            required
                            select
                            options={dataYearOfManufacture}
                            onChange={handleChangeValueYearOfManufacture}
                            value={valueYearOfManufacture}
                        />
                    </FormGroup>
                    {/* ----------------------- */}
                    <FormGroup widths={2}>
                        <FormFieldComponent
                            title="Kích thước"
                            placeholder="Nhập Kích thước"
                            required
                            onChange={handleChangeValueSize}
                            value={valueSize}
                        />
                        <FormFieldComponent
                            title="Số trang"
                            placeholder="Nhập số trang"
                            required
                            onChange={handleChangeQuantityPage}
                            value={valueQuantityPage}
                        />
                    </FormGroup>
                    {/* ----------------------- */}
                    <FormField
                        control={TextArea}
                        label="Mô tả sản phẩm:"
                        placeholder="Nhập mô tả sản phẩm"
                        value={valueDescription}
                        onChange={handeleChangeValueDescription}
                    />
                </Form>
            </div>
            {showNotification && (
                <div className="fixed top-4 right-1 z-[100] bg-white text-black py-6 px-4 rounded shadow-2xl border-l-4 border-green animate-slide-in-right">
                    <div className="flex justify-between items-center gap-2 text-lg">
                        <CircleCheck className=" text-green" />
                        <p>Cập nhật sản phẩm thành công!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookEditPage;
