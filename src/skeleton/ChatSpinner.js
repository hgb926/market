import styled from "styled-components";
import {BarLoader, BeatLoader, FadeLoader} from "react-spinners";

const ChatSpinner = () => {
    return (
        <Container>
            <LoadingBox>
                <BarLoader color="#4D607B" />
            </LoadingBox>
            <TextBox>
                <div className="textTop"> 대화 불러오는 중 .. </div>
            </TextBox>
        </Container>
    );
};

export default ChatSpinner;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 300px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;

  img {
    width: 100%;
    height: auto;
  }
`;

const LoadingBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 130px;
`;

const TextBox = styled.div`
  width: 240px;
  position: absolute;
  top: 50%;
  left: 50%;
    color: #a1a1a1;
    text-align: center;
  transform: translate(-50%, -50%);
`;
