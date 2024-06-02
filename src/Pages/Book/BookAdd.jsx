import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Dimmer, Form, FormField, FormGroup, Input, Loader, Select, TextArea } from 'semantic-ui-react';
import FormFieldComponent from '../../Components/FormFieldComponent';
import axios from 'axios';
import { CircleCheck } from 'lucide-react';

function BookAddPage() {
    const [dataPublish, setDataPublish] = useState([]);
    const [dataSupplier, setDataSupplier] = useState([]);
    const [dataCategoryAll, setDataCategoryAll] = useState([]);
    const [dataCatgoryDetail, setDataCatgoryDetail] = useState([]);
    const [dataYear, setDataYear] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

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
        { key: 'soft', text: 'Mềm', value: 'Mềm' },
        { key: 'hard', text: 'Cứng', value: 'Cứng' },
    ];
    const dataLanguage = [
        { key: 'vn', text: 'Tiếng Việt', value: 'Tiếng Việt' },
        { key: 'us', text: 'Tiếng Anh', value: 'Tiếng Việt' },
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
    // --------------------------value declaration--------------------------------------
    const [valueName, setValueName] = useState();
    const [valueAuthor, setValueAuthor] = useState();
    const [valueImage, setValueImage] = useState([]);
    const [valueQuantity, setValueQuantity] = useState();
    const [valueForm, setValueForm] = useState();
    const [valuePublished, setValuePublished] = useState();
    const [valueSupplier, setValueSupplier] = useState();
    const [valueCategory, setValueCategory] = useState();
    const [valueCategoryDetail, setValueCategoryDetail] = useState();
    const [valueYear, setValueYear] = useState();
    const [valuePriceImport, setValuePriceImport] = useState();
    const [valuePriceSell, setValuePriceSell] = useState();
    const [valuePriceDiscount, setValuePriceDiscount] = useState();
    const [valueLanguage, setValueLanguage] = useState();
    const [valueYearOfManufacture, setValueYearOfManufacture] = useState();
    const [valueSize, setValueSize] = useState();
    const [valueQuantityPage, setValueQuantityPage] = useState();
    const [valueDescription, setValueDescription] = useState();
    // --------------------------error declaration--------------------------------------
    const [nameError, setNameError] = useState(false);
    const [authorError, setAuthorError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);
    const [formError, setFormError] = useState(false);
    const [publishedError, setPublishedError] = useState(false);
    const [supplierError, setSupplierError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [categoryDetailError, setCategoryDetailError] = useState(false);
    const [yearError, setYearError] = useState(false);
    const [priceImportError, setPriceImportError] = useState(false);
    const [priceSellError, setPriceSellError] = useState(false);
    const [languageError, setLanguageError] = useState(false);
    const [yearOfManufactureError, setYearOfManufactureError] = useState(false);
    const [sizeError, setSizeError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    // --------------------------number attributes--------------------------------------
    const handleChangeName = (e) => {
        setValueName(e.target.value);
    };
    const handleChangeAuthor = (e) => {
        setValueAuthor(e.target.value);
    };

    const handleChangeImage = (e) => {
        // const files = Array.from(e.target.files);
        // setFiles([...files, ...e.target.files]);
        setValueImage(e.target.files);
    };

    const handleChangeQuantity = (e) => {
        const newValue = e.target.value.replace(/\D/g, '');
        setValueQuantity(newValue);
    };
    const handleChangeForm = (e, data) => {
        setValueForm(data.value);
    };
    const handleChangePublished = (e, data) => {
        setValuePublished(data.value);
    };
    const handleChangeSupplier = (e, data) => {
        setValueSupplier(data.value);
    };
    const handleChangeCategory = (e) => {
        setValueCategory(e.target.value);
    };
    const handleChangeCategoryDetail = (e, data) => {
        setValueCategoryDetail(data.value);
    };
    const handleChangeYear = (e, data) => {
        setValueYear(data.value);
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
    const handleChangeLanguage = (e, data) => {
        setValueLanguage(data.value);
    };
    const handleChangeYearOfManufacture = (e, data) => {
        setValueYearOfManufacture(data.value);
    };
    const handleChangeSize = (e) => {
        setValueSize(e.target.value);
    };
    const handleChangeQuantityPage = (e) => {
        const newValue = e.target.value.replace(/\D/g, '');
        setValueQuantityPage(newValue);
    };
    const handleChangeDescription = (e) => {
        setValueDescription(e.target.value);
    };
    const convertToOptions = (data) => {
        return data.map((item) => ({
            key: item._id,
            value: item._id,
            text: item.name,
        }));
    };
    // --------------------------check error--------------------------------------
    const handleErrorName = () => {
        if (!valueName) {
            setNameError(true);
        } else {
            setNameError(false);
        }
    };
    const handleErrorAuthor = () => {
        if (!valueAuthor) {
            setAuthorError(true);
        } else {
            setAuthorError(false);
        }
    };
    const handleErrorImage = () => {
        if (valueImage.length === 0) {
            setImageError(true);
        } else {
            setImageError(false);
        }
    };
    const handleErrorQuantity = () => {
        if (!valueQuantity) {
            setQuantityError(true);
        } else {
            setQuantityError(false);
        }
    };
    const handleErrorForm = () => {
        if (!valueForm) {
            setFormError(true);
        } else {
            setFormError(false);
        }
    };
    const handleErrorPublished = () => {
        if (!valuePublished) {
            setPublishedError(true);
        } else {
            setPublishedError(false);
        }
    };
    const handleErrorSupplier = () => {
        if (!valueSupplier) {
            setSupplierError(true);
        } else {
            setSupplierError(false);
        }
    };
    const handleErrorCategory = () => {
        if (!valueCategory) {
            setCategoryError(true);
        } else {
            setCategoryError(false);
        }
    };
    const handleErrorCategoryDetail = () => {
        if (!valueCategoryDetail) {
            setCategoryDetailError(true);
        } else {
            setCategoryDetailError(false);
        }
    };
    const handleErrorYear = () => {
        if (!valueYear) {
            setYearError(true);
        } else {
            setYearError(false);
        }
    };
    const handleErrorPriceImport = () => {
        if (!valuePriceImport) {
            setPriceImportError(true);
        } else {
            setPriceImportError(false);
        }
    };
    const handleErrorPriceSell = () => {
        if (!valuePriceSell) {
            setPriceSellError(true);
        } else {
            setPriceSellError(false);
        }
    };
    const handleErrorLanguage = () => {
        if (!valueLanguage) {
            setLanguageError(true);
        } else {
            setLanguageError(false);
        }
    };
    const handleErrorYearOfManufacture = () => {
        if (!valueYearOfManufacture) {
            setYearOfManufactureError(true);
        } else {
            setYearOfManufactureError(false);
        }
    };
    const handleErrorSize = () => {
        if (!valueSize) {
            setSizeError(true);
        } else {
            setSizeError(false);
        }
    };
    const handleErrorQuantityPage = () => {
        if (!valueQuantityPage) {
            setQuantityError(true);
        } else {
            setQuantityError(false);
        }
    };
    const handleErrorDescription = () => {
        if (!valueDescription) {
            setDescriptionError(true);
        } else {
            setDescriptionError(false);
        }
    };
    const [selectedCategoryAll, setSelectedCategoryAll] = useState(null);
    const [filteredCategoryDetailOptions, setFilteredCategoryDetailOptions] = useState([]);

    const handleCategoryAllChange = (event, data) => {
        setValueCategory(data.value);
        setSelectedCategoryAll(data.value);
        const filteredOptions = dataCatgoryDetail.filter((option) => option.categoryAll_Id === data.value);
        setFilteredCategoryDetailOptions(convertToOptions(filteredOptions));
    };

    const handleAddProduct = async () => {
        // setIsSuccess(true);

        try {
            const formData = new FormData();
            console.log('valueImage', valueImage);
            formData.append('name', valueName);
            formData.append('author', valueAuthor);
            for (const file of valueImage) {
                formData.append('image', file);
            }
            formData.append('quantity', valueQuantity);
            formData.append('form', valueForm);
            formData.append('published', valuePublished);
            formData.append('supplier', valueSupplier);
            formData.append('category', valueCategory);
            formData.append('categoryDetail', valueCategoryDetail);
            formData.append('year', valueYear);
            formData.append('priceImport', valuePriceImport);
            formData.append('priceSell', valuePriceSell);
            formData.append('priceDiscount', valuePriceDiscount);
            formData.append('language', valueLanguage);
            formData.append('yearOfManufacture', valueYearOfManufacture);
            formData.append('size', valueSize);
            formData.append('quantityPage', valueQuantityPage);
            formData.append('description', valueDescription);
            const response = await axios.post('http://localhost:5000/product/add-product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // setIsSuccess(false);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                navigate('/Book');
            }, 800);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };
    return (
        <div className="p-5">
            <div className="flex items-center justify-between fixed top-0 left-0 right-0 bg-white z-50 py-4  pl-[18%] shadow-md  ">
                <h3 className="font-bold text-4xl">Thêm sách</h3>
                <div>
                    <Button primary onClick={handleAddProduct}>
                        Thêm
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
                        onChange={handleChangeName}
                        onBlur={handleErrorName}
                        error={nameError && 'Vui lòng nhập tên sách'}
                    />
                    <FormFieldComponent
                        title="Tác giả"
                        placeholder="Nhập tên tác giả"
                        required
                        onChange={handleChangeAuthor}
                        onBlur={handleErrorAuthor}
                        error={authorError && 'Vui lòng nhập tên tác giả'}
                    />
                    {/* ----------------------- */}
                    <FormField required>
                        <label for="image">Image:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            required
                            multiple
                            onChange={handleChangeImage}
                        />
                        <br />
                        <br />
                    </FormField>
                    {imageError && <span className=" block text-red -mt-4">Vui lòng chọn hình ảnh</span>}
                    <FormGroup widths={2}>
                        <FormFieldComponent
                            title="Số lượng"
                            placeholder="Nhập số lượng"
                            value={valueQuantity}
                            required
                            onChange={handleChangeQuantity}
                            onBlur={handleErrorQuantity}
                            error={quantityError ? 'Vui lòng nhập số lượng' : ''}
                        />
                        <FormFieldComponent
                            title="Hình thức sản phẩm"
                            placeholder="Chọn hình thức"
                            required
                            select
                            options={form}
                            onChange={handleChangeForm}
                            onBlur={handleErrorForm}
                            error={formError ? 'Vui lòng chọn hình thức' : ''}
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
                            onChange={handleChangePublished}
                            onBlur={handleErrorPublished}
                            error={publishedError && 'Vui lòng chọn nhà xuất bản'}
                        />

                        <FormFieldComponent
                            title="Nhà cung cấp"
                            placeholder="Chọn nhà cung cấp"
                            required
                            select
                            options={convertToOptions(dataSupplier)}
                            onChange={handleChangeSupplier}
                            onBlur={handleErrorSupplier}
                            error={supplierError && 'Vui lòng chọn nhà cung cấp'}
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
                            onBlur={handleErrorCategory}
                            value={selectedCategoryAll}
                            error={categoryError && 'Vui lòng chọn danh mục'}
                        />
                        <FormFieldComponent
                            title="Danh mục chi tiết"
                            placeholder="Chọn danh mục chi tiết"
                            required
                            select
                            options={filteredCategoryDetailOptions}
                            onChange={handleChangeCategoryDetail}
                            onBlur={handleErrorCategoryDetail}
                            error={categoryDetailError && 'Vui lòng chọn danh mục chi tiết'}
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
                            onBlur={handleErrorYear}
                            error={yearError && 'Vui lòng chọn độ tuổi'}
                        />
                    </FormGroup>
                    {/* ----------------------- */}
                    <FormGroup widths={3}>
                        <FormFieldComponent
                            title="Giá nhập"
                            placeholder="Nhập giá"
                            required
                            onChange={handleChangePriceImport}
                            onBlur={handleErrorPriceImport}
                            value={valuePriceImport}
                            error={priceImportError && 'Vui lòng nhập giá nhập'}
                        />
                        <FormFieldComponent
                            title="Giá bán"
                            placeholder="Nhập giá"
                            required
                            onChange={handleChangePriceSell}
                            onBlur={handleErrorPriceSell}
                            value={valuePriceSell}
                            error={priceSellError && 'Vui lòng nhập giá bán'}
                        />
                        <FormFieldComponent
                            title="Giá giảm"
                            placeholder="Nhập giá"
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
                            onChange={handleChangeLanguage}
                            onBlur={handleErrorLanguage}
                            error={languageError && 'Vui lòng chọn ngôn ngữ'}
                        />

                        <FormFieldComponent
                            title="Năm sản xuất"
                            placeholder="Nhập năm sản xuất"
                            required
                            select
                            options={dataYearOfManufacture}
                            onChange={handleChangeYearOfManufacture}
                            onBlur={handleErrorYearOfManufacture}
                            error={yearOfManufactureError && 'Vui lòng chọn năm sản xuất'}
                        />
                    </FormGroup>
                    {/* ----------------------- */}
                    <FormGroup widths={2}>
                        <FormFieldComponent
                            title="Kích thước"
                            placeholder="Nhập Kích thước"
                            required
                            onChange={handleChangeSize}
                            onBlur={handleErrorSize}
                            error={sizeError && 'Vui lòng nhập kích thước'}
                        />
                        <FormFieldComponent
                            title="Số trang"
                            placeholder="Nhập số trang"
                            onChange={handleChangeQuantityPage}
                            value={valueQuantityPage}
                        />
                    </FormGroup>
                    {/* ----------------------- */}
                    <FormField
                        control={TextArea}
                        label="Mô tả sản phẩm:"
                        placeholder="Nhập mô tả sản phẩm"
                        onChange={handleChangeDescription}
                        onBlur={handleErrorDescription}
                        required
                        error={descriptionError && 'Vui lòng nhập mô tả sản phẩm'}
                    />
                    {isSuccess ? (
                        <div className=" fixed bg-gray-500  h-screen top-0 left-0 bottom-0 right-0 z-[100] flex items-center justify-center opacity-70">
                            <Dimmer active inverted>
                                <Loader size="big">Loading</Loader>
                            </Dimmer>
                        </div>
                    ) : null}
                </Form>
            </div>
            {showNotification && (
                <div className="fixed top-4 right-1 z-[100] min-w-56 bg-white text-black py-6 px-4 rounded shadow-2xl border-l-4 border-green animate-slide-in-right">
                    <div className="flex  items-center gap-2 text-lg">
                        <CircleCheck style={{ color: '#68FD87' }} />
                        <p>Thêm sách thành công!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookAddPage;
