import styled from "styled-components";

export const ButtonContainer = styled.button`
    background-color: ${props => {
        if (props.loading) return '#E0E0E0';
        if (props.type === 'danger') return '#FF0000';
        return '#FAFAFA';
    }};
    border: 1px solid ${props => props.type === 'danger' ? '#FF0000' : '#FAFAFA'};
    border-radius: 20px;
    
    height: 62px;
    width: 80%;
    margin: 20px;
    
    color: ${props => props.type === 'danger' ? '#FFFFFF' : '#000000'};

    &:hover {
        background-color: ${props => {
            if (props.loading) return '#E0E0E0';
            if (props.type === 'danger') return '#CC0000';
            return '#FAFAFA40';
        }};
        cursor: ${props => props.loading ? 'not-allowed' : 'pointer'};
    }

    &:disabled {
        cursor: not-allowed;
    }
`;