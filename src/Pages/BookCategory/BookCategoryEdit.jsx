import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, FormField, TextArea, Form } from 'semantic-ui-react';
import FormFieldComponent from '../../Components/FormFieldComponent';
import axios from 'axios';
import { CircleCheck } from 'lucide-react';
function BookCategoryEditPage() {
    useEffect(() => {
        document.title = 'Chi tiết loại sách';
    }, []);
    const location = useLocation();
    const { dataDetail } = location.state;
    console.log(dataDetail);
    const [valueName, setValueName] = useState(dataDetail.name);
    const [valueDescription, setValueDescription] = useState(dataDetail.description);
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);

    const handleValueDescription = (e) => {
        setValueDescription(e.target.value);
    };
    const handleValueName = (e) => {
        setValueName(e.target.value);
    };
    const handleUpdate = () => {
        axios
            .patch(`https://backend-book-store-two.vercel.app/categoryAll/${dataDetail._id}`, {
                name: valueName,
                description: valueDescription,
            })
            .then((response) => {
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                    navigate('/BookCategory');
                }, 800);
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
            {showNotification && (
                <div className="fixed top-4 right-1 z-[100] min-w-56 bg-white text-black py-6 px-4 rounded shadow-2xl border-l-4 border-green animate-slide-in-right">
                    <div className="flex  items-center gap-2 text-lg">
                        <CircleCheck style={{ color: '#68FD87' }} />
                        <p>Cập nhật thành công!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookCategoryEditPage;
