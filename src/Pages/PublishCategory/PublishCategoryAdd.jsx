import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, FormField, TextArea, Form } from 'semantic-ui-react';
import FormFieldComponent from '../../Components/FormFieldComponent';
import axios from 'axios';
import { CircleCheck } from 'lucide-react';

function PublishCategoryAddPage() {
    useEffect(() => {
        document.title = 'Thêm Nhà xuất bản';
    }, []);
    const [valueName, setValueName] = useState();
    const [valueDescription, setValueDescription] = useState();
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();
    const handleValueName = (e) => {
        setValueName(e.target.value);
    };
    const handleValueDescription = (e) => {
        setValueDescription(e.target.value);
    };
    const handleAddBook = () => {
        axios
            .post('https://backend-book-store-two.vercel.app/categoryPublish', {
                name: valueName,
                description: valueDescription,
            })
            .then((response) => {
                setTimeout(() => {
                    setShowNotification(false);
                    navigate('/publishCategory');
                }, 800);
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
    };
    return (
        <div className="p-5">
            <div className="flex items-center justify-between fixed top-0 left-0 right-0 bg-white z-50 py-4  pl-[18%] shadow-md  ">
                <h3 className="font-bold text-4xl">Thêm Nhà xuất bản</h3>
                <div>
                    <Button primary onClick={handleAddBook}>
                        Thêm
                    </Button>
                    <Link to="/publishCategory">
                        <Button color="red">Hủy</Button>
                    </Link>
                </div>
            </div>
            <div className="mb-5 py-16">
                <Form size="large">
                    <FormFieldComponent onChange={handleValueName} title="Tên" placeholder="Nhập tên sách" required />
                    <FormField
                        onChange={handleValueDescription}
                        control={TextArea}
                        label="Mô tả:"
                        placeholder="Nhập mô tả sản phẩm"
                    />
                </Form>
            </div>
            {showNotification && (
                <div className="fixed top-4 right-1 z-[100] bg-white text-black py-6 px-4 rounded shadow-2xl border-l-4 border-green animate-slide-in-right">
                    <div className="flex items-center gap-2 text-lg">
                        <CircleCheck style={{ color: '#68FD87' }} />
                        <p>Thêm Nhà xuất bản thành công!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PublishCategoryAddPage;
