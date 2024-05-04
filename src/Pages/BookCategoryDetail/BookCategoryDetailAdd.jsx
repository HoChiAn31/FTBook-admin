import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, FormField, TextArea, Form } from 'semantic-ui-react';
import FormFieldComponent from '../../Components/FormFieldComponent';
import axios from 'axios';

function BookCategoryDetailAddPage() {
    useEffect(() => {
        document.title = 'Thêm loại sách';
    }, []);
    const [valueName, setValueName] = useState();
    const [valueDescription, setValueDescription] = useState();
    const navigate = useNavigate();
    const handleValueName = (e) => {
        setValueName(e.target.value);
    };
    const handleValueDescription = (e) => {
        setValueDescription(e.target.value);
    };
    const handleAddBook = () => {
        axios
            .post('http://localhost:5000/categoryAll', {
                name: valueName,
                description: valueDescription,
            })
            .then((response) => {
                navigate('/BookCategory');
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
    };
    return (
        <div className="p-5">
            <div className="flex items-center justify-between fixed top-0 left-0 right-0 bg-white z-50 py-4  pl-[18%] shadow-md  ">
                <h3 className="font-bold text-4xl">Thêm sách</h3>
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
