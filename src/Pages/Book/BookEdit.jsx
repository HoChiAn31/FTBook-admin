import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Form, FormField, FormGroup, TextArea } from 'semantic-ui-react';
import FormFieldComponent from '../../Components/FormFieldComponent';
import axios from 'axios';

function BookEditPage() {
    const [dataPublish, setDataPublish] = useState([]);
    const [dataSupplier, setDataSupplier] = useState([]);
    const [dataCategoryAll, setDataCategoryAll] = useState([]);
    const [dataCatgoryDetail, setDataCatgoryDetail] = useState([]);
    const [dataYear, setDataYear] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const { dataDetailBook } = location.state;
    console.log(dataDetailBook);
    // --------------------------value declaration--------------------------------------
    const [valueName, setValueName] = useState(dataDetailBook.name);
    const [valueAuthor, setValueAuthor] = useState(dataDetailBook.author);

    //    const [valueImage, setValueImage] = useState([]);
    const [valueQuantity, setValueQuantity] = useState(dataDetailBook.quantity);
    const [valueForm, setValueForm] = useState(dataDetailBook.form);
    const [valuePublished, setValuePublished] = useState(dataDetailBook.published);
    const [valueSupplier, setValueSupplier] = useState(dataDetailBook.spplier);
    const [valueCategory, setValueCategory] = useState(dataDetailBook.category);
    //    const [valueCategoryDetail, setValueCategoryDetail] = useState(dataDetailBook.);
    //    const [valueYear, setValueYear] = useState();
    //    const [valuePriceImport, setValuePriceImport] = useState();
    //    const [valuePriceSell, setValuePriceSell] = useState();
    //    const [valuePriceDiscount, setValuePriceDiscount] = useState();
    //    const [valueLanguage, setValueLanguage] = useState();
    //    const [valueYearOfManufacture, setValueYearOfManufacture] = useState();
    //    const [valueSize, setValueSize] = useState();
    //    const [valueQuantityPage, setValueQuantityPage] = useState();
    //    const [valueDescription, setValueDescription] = useState();
    const loadDataPublish = () => {
        axios
            .get('http://localhost:5000/categoryPublish')
            .then((res) => {
                setDataPublish(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const loadDataSupplier = () => {
        axios
            .get('http://localhost:5000/categorySupplier')
            .then((res) => {
                setDataSupplier(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const loadCategoryAll = () => {
        axios
            .get('http://localhost:5000/categoryAll')
            .then((res) => {
                setDataCategoryAll(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const loadCategoryDetail = () => {
        axios
            .get('http://localhost:5000/categoryDetail')
            .then((res) => {
                setDataCatgoryDetail(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const loadDateYear = () => {
        axios
            .get('http://localhost:5000/categoryYear')
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
    const dataYearOfManufacture = [
        {
            key: '1980',
            text: '1980',
            value: '1980',
        },
        {
            key: '1981',
            text: '1981',
            value: '1981',
        },
        {
            key: '1982',
            text: '1982',
            value: '1982',
        },
        {
            key: '1983',
            text: '1983',
            value: '1983',
        },
        {
            key: '1984',
            text: '1984',
            value: '1984',
        },
        {
            key: '1985',
            text: '1985',
            value: '1985',
        },
        {
            key: '1986',
            text: '1986',
            value: '1986',
        },
        {
            key: '1987',
            text: '1987',
            value: '1987',
        },
        {
            key: '1988',
            text: '1988',
            value: '1988',
        },
        {
            key: '1989',
            text: '1989',
            value: '1989',
        },
        {
            key: '1990',
            text: '1990',
            value: '1990',
        },
        {
            key: '1991',
            text: '1991',
            value: '1991',
        },
        {
            key: '1992',
            text: '1992',
            value: '1992',
        },
        {
            key: '1993',
            text: '1993',
            value: '1993',
        },
        {
            key: '1994',
            text: '1994',
            value: '1994',
        },
        {
            key: '1995',
            text: '1995',
            value: '1995',
        },
        {
            key: '1996',
            text: '1996',
            value: '1996',
        },
        {
            key: '1997',
            text: '1997',
            value: '1997',
        },
        {
            key: '1998',
            text: '1998',
            value: '1998',
        },
        {
            key: '1999',
            text: '1999',
            value: '1999',
        },
        {
            key: '2000',
            text: '2000',
            value: '2000',
        },
        {
            key: '2001',
            text: '2001',
            value: '2001',
        },
        {
            key: '2002',
            text: '2002',
            value: '2002',
        },
        {
            key: '2003',
            text: '2003',
            value: '2003',
        },
        {
            key: '2004',
            text: '2004',
            value: '2004',
        },
        {
            key: '2005',
            text: '2005',
            value: '2005',
        },
        {
            key: '2006',
            text: '2006',
            value: '2006',
        },
        {
            key: '2007',
            text: '2007',
            value: '2007',
        },
        {
            key: '2008',
            text: '2008',
            value: '2008',
        },
        {
            key: '2009',
            text: '2009',
            value: '2009',
        },
        {
            key: '2010',
            text: '2010',
            value: '2010',
        },
        {
            key: '2011',
            text: '2011',
            value: '2011',
        },
        {
            key: '2012',
            text: '2012',
            value: '2012',
        },
        {
            key: '2013',
            text: '2013',
            value: '2013',
        },
        {
            key: '2014',
            text: '2014',
            value: '2014',
        },
        {
            key: '2015',
            text: '2015',
            value: '2015',
        },
        {
            key: '2016',
            text: '2016',
            value: '2016',
        },
        {
            key: '2017',
            text: '2017',
            value: '2017',
        },
        {
            key: '2018',
            text: '2018',
            value: '2018',
        },
        {
            key: '2019',
            text: '2019',
            value: '2019',
        },
        {
            key: '2020',
            text: '2020',
            value: '2020',
        },
        {
            key: '2021',
            text: '2021',
            value: '2021',
        },
        {
            key: '2022',
            text: '2022',
            value: '2022',
        },
        {
            key: '2023',
            text: '2023',
            value: '2023',
        },
        {
            key: '2024',
            text: '2024',
            value: '2024',
        },
    ];
    const [valuePriceImport, setValuePriceImport] = useState();
    const [valuePriceSell, setValuePriceSell] = useState();
    const [valuePriceDiscount, setValuePriceDiscount] = useState();
    const [valueQuantityPage, setValueQuantityPage] = useState();
    // --------------------------number attributes--------------------------------------
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
    const [selectedCategoryAll, setSelectedCategoryAll] = useState(null);
    const [filteredCategoryDetailOptions, setFilteredCategoryDetailOptions] = useState([]);

    const handleCategoryAllChange = (event, data) => {
        setSelectedCategoryAll(data.value);
        const filteredOptions = dataCatgoryDetail.filter((option) => option.categoryAll_Id === data.value);
        setFilteredCategoryDetailOptions(convertToOptions(filteredOptions));
    };

    return (
        <div className="p-5">
            <div className="flex items-center justify-between fixed top-0 left-0 right-0 bg-white z-50 py-4  pl-[18%] shadow-md  ">
                <h3 className="font-bold text-4xl">Chi tiết sách</h3>
                <div>
                    <Button primary>Thêm</Button>
                    <Link to="/book">
                        <Button color="red">Hủy</Button>
                    </Link>
                </div>
            </div>
            <div className="mb-5 py-16">
                <Form size="large">
                    {/* ----------------------- */}
                    <FormFieldComponent title="Tên sách" placeholder="Nhập tên sách" required value={valueName} />
                    <FormFieldComponent title="Tác giả" placeholder="Nhập tên tác giả" required value={valueAuthor} />
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
                        />
                        <FormFieldComponent
                            title="Nhà cung cấp"
                            placeholder="Chọn nhà cung cấp"
                            required
                            select
                            options={convertToOptions(dataSupplier)}
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
                        />
                        <FormFieldComponent
                            title="Năm sản xuất"
                            placeholder="Nhập năm sản xuất"
                            required
                            select
                            options={dataYearOfManufacture}
                        />
                    </FormGroup>
                    {/* ----------------------- */}
                    <FormGroup widths={2}>
                        <FormFieldComponent title="Kích thước" placeholder="Nhập Kích thước" required />
                        <FormFieldComponent
                            title="Số trang"
                            placeholder="Nhập số trang"
                            required
                            onChange={handleChangeQuantityPage}
                            value={valueQuantityPage}
                        />
                    </FormGroup>
                    {/* ----------------------- */}
                    <FormField control={TextArea} label="Mô tả sản phẩm:" placeholder="Nhập mô tả sản phẩm" />
                </Form>
            </div>
        </div>
    );
}

export default BookEditPage;
