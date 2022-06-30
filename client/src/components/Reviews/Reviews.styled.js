import styled from "styled-components"

export const StyledUserReviews = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bgPage};

    .reviews {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`
export const StyledReviewCard = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;

    .deleteBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        gap: 0.5rem;
        color: ${({ theme }) => theme.text.highContrast};
        background-color: ${({ theme }) => theme.text.background};
        cursor: pointer;
        &:hover {
            background-color: red;
            color: ${({ theme }) => theme.text.light};
        }
    }

    .card {
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        color: ${({ theme }) => theme.text.highContrast};
        background-color: ${({ theme }) => theme.colors.background};
        gap: 0.5rem;

        & > * {
            padding: 0.5rem;
        }

        .header,
        .info,
        .score,
        .date,
        .author {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
        }

        .header {
            font-size: 1.5rem;
            padding: 0.5rem;

            .score {
                .icon {
                    color: ${({ theme }) => theme.colors.main};
                }
            }
        }

        .title{
            background: transparent;
        }
        .comment {
            word-break: break-all;
        }

        .info {
            border-radius: 8px;
            background-color: ${({ theme }) => theme.colors.main};
            color: ${({ theme }) => theme.text.dark};
            display: flex;
            align-items: center;
        }
    }
`
