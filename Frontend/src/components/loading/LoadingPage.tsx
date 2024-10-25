import { Spin } from "antd";

const LoadingPage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <div className="text-center text-3xl mb-5 font-bold text-[#356fee] ">Xin vui lòng chờ...</div>
            <Spin size="large" />
        </div>
    );
};
export default LoadingPage;
