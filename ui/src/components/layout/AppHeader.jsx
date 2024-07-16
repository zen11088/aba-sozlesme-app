import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import styled from "styled-components";

const { Header } = Layout;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  background: var(--color-text-variant);
  padding: 0 24px;
  height: 48px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 36px;
  margin-right: 16px;
`;

const HeaderTitle = styled.span`
  font-size: 15px;
  font-weight: var(--font-weight-regular);
  color: var(--color-white);
`;

function AppHeader() {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <HeaderContent onClick={() => navigate("/")}>
        <Logo src="logo.png" alt="Logo" />
        <HeaderTitle>Aba Eğitim</HeaderTitle>
      </HeaderContent>
    </StyledHeader>
  );
}

export default AppHeader;
