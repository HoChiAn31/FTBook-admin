import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, FormField, TextArea, Form } from 'semantic-ui-react';
import FormFieldComponent from '../../Components/FormFieldComponent';
import axios from 'axios';
import { CircleCheck } from 'lucide-react';
function SuppliersCategoryEditPage() {
    useEffect(() => {
        document.title = `Chi tiết Nhà cung cấp `;
    }, []);
    const location = useLocation();
    const { dataDetail } = location.state;
    const [valueName, setValueName] = useState(dataDetail.name);
    const [valueDescription, setValueDescription] = useState(dataDetail.description);
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const handleValueDescription = (e) => {
        setValueDescription(e.target.value);
    };
    const handleValueName = (e) => {
        setValueName(e.target.value);
    };
    const handleUpdate = () => {
        axios
            .patch(`http://localhost:5000/categorySupplier/${dataDetail._id}`, {
                name: valueName,
                description: valueDescription,
            })
            .then((response) => {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    navigate('/suppliersCategory');
                }, 800);
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
    };
    return (
        <div className="p-5">
            <div className="flex items-center justify-between fixed top-0 left-0 right-0 bg-white z-50 py-4  pl-[18%] shadow-md  ">
                <h3 className="font-bold text-4xl">
                    Chi tiết Nhà cung cấp <span className="text-blue-500">{dataDetail.name}</span>
                </h3>
                <div>
                    <Button primary onClick={handleUpdate}>
                        Cập nhật
                    </Button>
                    <Link to="/suppliersCategory">
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
            {isSuccess && (
                <>
                    <div className="fixed top-4 right-1 z-[100] min-w-56 bg-white text-black py-6 px-4 rounded shadow-2xl border-l-4 border-green animate-slide-in-right">
                        <div className="flex items-center gap-2 text-lg">
                            <CircleCheck style={{ color: '#68FD87' }} />
                            <p>Cập nhật thành công!</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default SuppliersCategoryEditPage;
