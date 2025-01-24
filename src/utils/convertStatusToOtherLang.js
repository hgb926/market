export const convertStatusToKorean = (tradeType, status) => {
    // tradeType : SELL, SHARE
    // status: RESERVED, SOLD, NOT_SOLD_YET
    let type = tradeType === "SELL" ? '판매' : '나눔'
    switch (status) {
        case "NOT_SORD_YET":
            return `${type}중`
        case "RESERVED":
            return "예약중"
        case "SOLD":
            return `${type} 완료`
        default:
            break;
    }
}

export const convertStatusToEng = (tradeType, status) => {
    // tradeType : SELL, SHARE
    // status: 판매중, 예약중, 판매 완료,
    let type = tradeType === "SELL" ? '판매' : '나눔'
    switch (status) {
        case `${type}중`:
            return `NOT_SORD_YET`
        case "예약중":
            return "RESERVED"
        case `${type} 완료`:
            return `SOLD`
        default:
            break;
    }
}


