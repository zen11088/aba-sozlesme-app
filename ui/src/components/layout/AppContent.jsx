import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const CustomContent = styled(Content)`
  padding: 24px;
  overflow: auto;
  background: var(--color-default-bg) !important;
`;

function AppContent() {
  return (
    <CustomContent>
      <Outlet />
    </CustomContent>
  );
}

export default AppContent;
