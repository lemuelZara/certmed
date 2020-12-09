import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 118rem;
  padding: 0 3rem;
  margin: 3.2rem auto;

  > h1 {
    margin-top: 8rem;
    margin-bottom: 2.4rem;
    font-weight: bold;
  }

  > ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.4rem;
    list-style: none;

    > li {
      background: #fff;
      padding: 2.4rem;
      border-radius: 0.8rem;
      position: relative;

      > strong {
        display: block;
        margin-bottom: 1.5rem;
        color: #41414d;
        font-size: 1.4rem;
        font-weight: bold;
      }

      > p {
        color: #737380;
        line-height: 2rem;
        font-size: 1.4rem;
      }

      > p + strong {
        margin-top: 3rem;
      }

      > button {
        width: 22rem;
        border: 0;
        border-radius: 0.4rem;
        padding: 0.8rem;
        transition: opacity 1s;
        background: #4ad295;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 4rem;

        > span {
          font-weight: bold;
          font-size: 1.4rem;
          color: #fff;
        }

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > svg {
    width: 8rem;
    height: auto;
  }

  > span {
    flex: 1;
    font-size: 2rem;
    margin-left: 2.4rem;
  }

  > a {
    width: 30rem;
    height: 6rem;
    background: #4ad295;
    border: 0;
    border-radius: 0.8rem;
    color: #fff;
    margin-left: auto;
    font-weight: 700;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    font-size: 1.4rem;
    line-height: 6rem;
    transition: filter 0.3s;
  }

  > button {
    height: 6rem;
    width: 6rem;
    border-radius: 0.4rem;
    border: 1px solid #4ad295;
    background: transparent;
    margin-left: 1.6rem;

    &:hover {
      border-color: #999;

      > svg {
        fill: #999;
      }
    }
  }
`;
