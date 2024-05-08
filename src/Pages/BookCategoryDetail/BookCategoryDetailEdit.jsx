import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, FormField, TextArea, Form } from 'semantic-ui-react';
import FormFieldComponent from '../../Components/FormFieldComponent';
import axios from 'axios';
function BookCategoryDetailEditPage() {
    useEffect(() => {
        document.title = 'Chi tiết loại sách';
    }, []);
    const location = useLocation();
    const { dataDetail } = location.state;
    console.log(dataDetail);
    const [valueName, setValueName] = useState(dataDetail.name);
    const [valueDescription, setValueDescription] = useState(dataDetail.description);
    const [valueCategoryAll, setValueCategoryAll] = useState(dataDetail.categoryAll_Id);

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
    const handleValueDescription = (e) => {
        setValueDescription(e.target.value);
    };
    const handleValueName = (e) => {
        setValueName(e.target.value);
    };
    const handleChangeCategory = (e, { value }) => {
        setValueCategoryAll(value);
    };
    const handleUpdate = () => {
        axios
            .patch(`http://localhost:5000/categoryDetail/${dataDetail._id}`, {
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
                <h3 className="font-bold text-4xl">Chi tiết sách</h3>
                <div>
                    <Button primary onClick={handleUpdate}>
                        Cập nhật
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
                        value={valueName}
                        onChange={handleValueName}
                    />
                    <FormFieldComponent
                        title="Danh mục"
                        placeholder="Chọn danh mục"
                        required
                        select
                        value={valueCategoryAll}
                        onChange={handleChangeCategory}
                        options={convertToOptions(dataCategoryAll)}
                    />
                    <FormField
                        control={TextArea}
                        label="Mô tả sản phẩm:"
                        placeholder="Nhập mô tả sản phẩm"
                        // value={dataDetail.description}
                        value={valueDescription}
                        onChange={handleValueDescription}
                    />
                </Form>
            </div>
        </div>
    );
}

export default BookCategoryDetailEditPage;