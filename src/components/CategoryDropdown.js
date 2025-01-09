import React, { useState, useRef } from 'react';
import styles from '../styles/components/CategoryDropdown.module.scss';

const categories = [
    '전자제품', '의류', '신발', '가방', '악세사리', '가구', '생활용품', '도서', '음반/영상', '스포츠', '취미/여행',
    '반려동물 용품', '식품', '유아용품', '자동차 용품', '공구', '미용/화장품', '기타'
];

const CategoryDropdown = ({ onCategorySelect }) => {
    const [searchText, setSearchText] = useState('');
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const inputRef = useRef();

    const filterCategories = (text) => {
        setSearchText(text);
        setFilteredCategories(
            categories.filter((category) =>
                category.toLowerCase().includes(text.toLowerCase())
            )
        );
    };

    const handleCategorySelect = (category) => {
        onCategorySelect(category);
        setDropdownVisible(false);
        setSearchText(category); // 선택된 카테고리 이름을 입력 필드에 표시
    };

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                ref={inputRef}
                value={searchText}
                className={styles.input}
                placeholder="카테고리를 입력하세요"
                onFocus={toggleDropdown}
                onChange={(e) => filterCategories(e.target.value)}
            />
            {isDropdownVisible && (
                <ul className={styles.dropdown}>
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category, index) => (
                            <li
                                key={index}
                                onClick={() => handleCategorySelect(category)}
                                className={styles.dropdownItem}
                            >
                                {category}
                            </li>
                        ))
                    ) : (
                        <li className={styles.noResults}>검색 결과가 없습니다.</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default CategoryDropdown;