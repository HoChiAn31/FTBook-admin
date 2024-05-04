import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormField, TextArea, Form } from 'semantic-ui-react';
import FormFieldComponent from '../../Components/FormFieldComponent';

function PublishCategoryAddPage() {
    useEffect(() => {
        document.title = 'Thêm Nhà xuất bản';
    }, []);
    return (
        <div className="p-5">
            <div className="flex items-center justify-between fixed top-0 left-0 right-0 bg-white z-50 py-4  pl-[18%] shadow-md  ">
                <h3 className="font-bold text-4xl">Thêm Nhà xuất bản</h3>
                <div>
                    <Button primary>Thêm</Button>
                    <Link to="/publishCategory">
                        <Button color="red">Hủy</Button>
                    </Link>
                </div>
            </div>
            <div className="mb-5 py-16">
                <Form size="large">
                    <FormFieldComponent title="Tên" placeholder="Nhập tên sách" required />
                    <FormField control={TextArea} label="Mô tả:" placeholder="Nhập mô tả sản phẩm" />
                </Form>
            </div>
        </div>
    );
}

export default PublishCategoryAddPage;
