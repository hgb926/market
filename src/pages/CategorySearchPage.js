import React from 'react';
import {useParams} from "react-router-dom";

const CategorySearchPage = () => {

    const {keyword: category} = useParams();
    console.log(category)

    return (
        <div>

        </div>
    );
};

export default CategorySearchPage;