import styled, { keyframes } from "styled-components";

/**
 * 애니메이션
 */
const hoverAnimationOpacty = keyframes`
    0%{
        transform: translateY(0);
    }
    50%, 80%,100%  {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
`;

/**
 * 스타일
 */
export const StyledList = styled.div`
  .markerWrap {
    position: absolute;
    display: block;
    width: 104px;
    height: auto;
    border: 2px solid #505050;
    background-color: #fff;
    filter: drop-shadow(0px 4px 4px rgba(124, 122, 122, 0.25));
    box-sizing: border-box;
    :hover {
      z-index: 100;
      animation: ${hoverAnimationOpacty} 1s linear;
    }

    .title {
      height: 24px;
      line-height: 24px;
      text-align: center;
      color: #fff;
      background-color: #505050;
    }
    .contentsList {
      height: 22px;
      padding: 0 4px;
      font-size: 13px;
      line-height: 22px;
      box-sizing: border-box;

      :not(:last-child) {
        border-bottom: 1px solid #dedede;
      }
    }
  }
`;

export const ButtonStyled = styled.button`
  position: absolute;
  bottom: 40px;
  right: 40px;
  width: 40px;
  height: 30px;
  z-index: 200;
  background-color: #fff;
`;
