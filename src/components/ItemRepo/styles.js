import styled from 'styled-components';

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;

  h3 {
    margin: 0;
    padding: 0;
  }

  p {
    margin: 5px 0;
    padding: 0;
  }

  div {
    display: flex;
    gap: 10px;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      background-color: #0056b3;
    }

    &.remover {
      background-color: #dc3545;

      &:hover {
        background-color: #c82333;
      }
    }
  }

  hr {
    margin-top: 20px;
  }
`;
