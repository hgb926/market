import React from 'react';
import { useRouteError } from "react-router-dom";
import RootLayout from "../layout/RootLayout";

const ErrorPage = () => {
    const error = useRouteError();

    let errorMessage = "문제가 발생했습니다. 다시 시도해 주세요.";

    if (error.status === 404) {
        errorMessage = "페이지를 찾을 수 없습니다. URL을 확인하세요.";
    } else if (error.status === 400) {
        try {
            const errorData = JSON.parse(error.data);
            errorMessage = errorData.message || "잘못된 요청입니다. 다시 시도해 주세요.";
        } catch (parseError) {
            errorMessage = "잘못된 요청입니다. 다시 시도해 주세요.";
        }
    }

    return (
        <>
            <RootLayout/>
            <div style={{
                fontSize: "1.5rem",
                textAlign: "center",
                left: '50%',
                top: '30%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                color: 'white',
                position: 'absolute',
                lineHeight: '2rem',
            }}>
                {errorMessage}
            </div>
        </>
    );
};

export default ErrorPage;