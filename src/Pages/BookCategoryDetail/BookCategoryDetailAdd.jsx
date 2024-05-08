import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, FormField, TextArea, Form } from 'semantic-ui-react';
import FormFieldComponent from '../../Components/FormFieldComponent';
import axios from 'axios';

function BookCategoryDetailAddPage() {
    useEffect(() => {
        document.title = 'Thêm danh mục chi tiết';
    }, []);
    const [valueName, setValueName] = useState();
    const [valueCategoryAll, setValueCategoryAll] = useState();
    const [valueDescription, setValueDescription] = useState();
    const [dataCategoryAll, setDataCategoryAll] = useState([]);

    const navigate = useNavigate();
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
    useEffect(() => {
        loadCategoryAll();
    }, []);
    const convertToOptions = (data) => {
        return data.map((item) => ({
            key: item._id,
            value: item._id,
            text: item.name,
        }));
    };
    const handleValueName = (e) => {
        setValueName(e.target.value);
    };
    const handleValueDescription = (e) => {
        setValueDescription(e.target.value);
    };
    const handleChangeCategory = (e, { value }) => {
        setValueCategoryAll(value);
    };
    const handleAddBook = () => {
        axios
            .post('http://localhost:5000/categoryDetail', {
                name: valueName,
                description: valueDescription,
                categoryAll_Id: valueCategoryAll,
            })
            .then((response) => {
                navigate('/bookCategoryDetail');
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
    };
    return (
        <div className="p-5">
            <div className="flex items-center justify-between fixed top-0 left-0 right-0 bg-white z-50 py-4  pl-[18%] shadow-md  ">
                <h3 className="font-bold text-4xl">Thêm danh mục chi tiết</h3>
                <div>
                    <Button primary onClick={handleAddBook}>
                        Thêm
                    </Button>
                    <Link to="/bookCategory">
                        <Button color="red">Hủy</Button>
                    </Link>
                </div>
            </div>
            <div className="mb-5 py-16">
                <Form size="large">
                    <FormFieldComponent
                        title="Tên sách"
                        placeholder="Nhập tên sách"
                        required
                        onChange={handleValueName}
                    />
                    <FormFieldComponent
                        title="Danh mục"
                        placeholder="Chọn danh mục"
                        required
                        select
                        onChange={handleChangeCategory}
                        options={convertToOptions(dataCategoryAll)}
                    />
                    <FormField
                        control={TextArea}
                        label="Mô tả sản phẩm:"
                        placeholder="Nhập mô tả sản phẩm"
                        onChange={handleValueDescription}
                    />
                </Form>
            </div>
        </div>
    );
}

export default BookCategoryDetailAddPage;