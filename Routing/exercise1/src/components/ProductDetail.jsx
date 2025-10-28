import { useParams, useNavigate } from "react-router-dom";

function ProductDetail (){
    const {productId} = useParams();
    const navigate = useNavigate();

    const handleBack = () => {navigate("/san-pham")};

    return (
        <>
        <h2>chi tiết sản phẩm : {productId}</h2>
        <button onClick={handleBack}>Quay lại trang sản phẩm</button>
        </>
    )
};
export default ProductDetail;