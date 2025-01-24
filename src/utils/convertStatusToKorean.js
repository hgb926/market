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
