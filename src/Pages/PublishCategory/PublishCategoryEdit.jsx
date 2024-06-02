import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, FormField, TextArea, Form } from 'semantic-ui-react';
import FormFieldComponent from '../../Components/FormFieldComponent';
import axios from 'axios';
import { CircleCheck } from 'lucide-react';
function PublishCategoryEdit() {
    useEffect(() => {
        document.title = 'Chi tiết Nhà xuất bản';
    }, []);
    const location = useLocation();

    const { bookDetail } = location.state;
    const [valueName, setValueName] = useState(bookDetail.name);
    const [valueDescription, setValueDescription] = useState(bookDetail.description);
    const [showNotification, setShowNotification] = useState(false);
    const handleValueDescription = (e) => {
        setValueDescription(e.target.value);
    };
    const handleValueName = (e) => {
        setValueName(e.target.value);
    };
    const hanldeUpdate = () => {
        console.log(valueName);
        console.log(valueDescription);

        axios
            .patch(`https://backend-book-store-two.vercel.app/categoryPublish/${bookDetail._id}`, {
                name: valueName,
                description: valueDescription,
            })
            .then((response) => {
                console.log(response.data);
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                    window.location.href = '/publishCategory';
                }, 800);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="p-5">
            <div className="flex items-center justify-between fixed top-0 left-0 right-0 bg-white z-50 py-4  pl-[18%] shadow  ">
                <h3 className="font-bold text-4xl">
                    Chi tiết Nhà xuất bản <span className="text-blue-500">{bookDetail.name}</span>
                </h3>
                <div>
                    <Button primary onClick={hanldeUpdate}>
                        Cập nhật
                    </Button>
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

export default PublishCategoryEdit;
