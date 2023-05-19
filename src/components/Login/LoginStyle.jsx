import styled from 'styled-components';
export const OuterLogin = styled.div`
  height: 100vh;
  position: relative;
  background-image: url("https://wallpaperaccess.com/full/1120863.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;
export const InnerLogin = styled.div`
  width: 50%;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff3;
  padding: 20px;
  box-shadow: 0 1rem 3rem rgba(0,0,0,.175) ;
  @media (max-width: 768px) {
    width: 99%;
    position: relative;
  }
`;