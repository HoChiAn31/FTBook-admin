import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, FormField, TextArea, Form } from 'semantic-ui-react';
import FormFieldComponent from '../../Components/FormFieldComponent';
function PublishCategoryEdit() {
    useEffect(() => {
        document.title = 'Chi tiết Nhà xuất bản';
    }, []);
    const location = useLocation();
    const { bookDetail } = location.state;
    const [valueName, setValueName] = useState(bookDetail.name);
    const [valueDescription, setValueDescription] = useState(bookDetail.description);
    const handleValueDescription = (e) => {
        setValueDescription(e.target.value);
    };
    const handleValueName = (e) => {
        setValueName(e.target.value);
    };
    return (
        <div className="p-5">
            <div className="flex items-center justify-between fixed top-0 left-0 right-0 bg-white z-50 py-4  pl-[18%] shadow-md  ">
                <h3 className="font-bold text-4xl">
                    Chi tiết Nhà xuất bản <span className="text-blue-500">{bookDetail.name}</span>
                </h3>
                <div>
                    <Button primary>Cập nhật</Button>
                    <Link to="/publishCategory">
                        <Button color="red">Hủy</Button>
                    </Link>
                </div>
            </div>
            <div className="mb-5 py-16">
                <Form size="large">
                    <FormFieldComponent
                        title="Tên"
                        placeholder="Nhập tên"
                        required
                        value={valueName}
                        onChange={handleValueName}
                    />

                    <FormField
                        control={TextArea}
                        label="Mô tả:"
                        placeholder="Nhập mô tả"
                        value={valueDescription}
                        onChange={handleValueDescription}
                    />
                </Form>
            </div>
        </div>
    );
}

export default PublishCategoryEdit;
