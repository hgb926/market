import React, { useState, useRef } from 'react';
import styles from '../../styles/components/CategoryDropdown.module.scss';

const categories = [
    '전자제품', '의류', '신발', '가방', '악세사리', '가구', '생활용품', '도서', '음반/영상', '스포츠', '취미/여행',
    '반려동물 용품', '식품', '유아용품', '자동차 용품', '공구', '미용/화장품', '기타',    '게임/콘솔', '디지털 기기',
    '컴퓨터/노트북', '카메라/촬영기기', '드론', '오디오 기기',
    '소형가전', '중고폰', '의료/건강기기', '캠핑용품', '헬스기구', '자전거/스쿠터',
    '보드/스케이트', '레고/블록', '피규어/장난감', '보드게임', '수집품', 'DIY 키트',
    '악기/음향기기', '원예/정원용품', '농업용품', '사무/문구', '조명/인테리어',
    '화방/미술재료', '전기/전자부품', '안전/보안용품', '건축/자재', '교육/학습도구',
    '파티/이벤트 용품', '계절 용품', '축구/야구 용품', '등산/트레킹', '낚시 용품',
    '스키/스노보드', '서핑/해양스포츠', '공예/수공예', '주얼리', '전통 공예품',
    '휴대폰 액세서리', '자동차 부품', '오토바이 용품', '유화/그림', '공예 재료',
    '에코/친환경 용품', '스타굿즈', '팬아트', '미술품'
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