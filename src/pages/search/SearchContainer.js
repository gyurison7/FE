import { styled } from "styled-components";

const SearchResutContainer = styled.div`
width: 100%;
margin-top: 15px;
p {
  padding-left: 20px;
  padding-top: 12px;
  color: rgba(83, 83, 83, 1);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
`;
const ThumbnailWrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
margin-top: 12px;
`;

const ThumbNail = styled.img`
flex: 1;
cursor: pointer;
max-width: calc(33.3333% - 2px);
margin: 1px;
height: 125px;
object-fit: cover;

&:hover {
  transform: scale(1.1);
}
`;

export {SearchResutContainer,ThumbnailWrapper,ThumbNail}