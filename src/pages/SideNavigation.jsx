import { Menu } from "antd";
import MasterLayout from "../Layout/MasterLayout";
import Profile from "../components/Profile";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const items = [{ label: "User Information", key: "profile", path: "/profile" }];

const SideNavigation = (props) => {
  const renderMenuItems = () => {
    return items.map((item) => {
      if (item.path) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        );
      } else if (item.parentKey) {
        return (
          <Menu.Item key={item.key} parentKey={item.parentKey}>
            {item.label}
          </Menu.Item>
        );
      } else {
        return <Menu.Item key={item.key}>{item.label}</Menu.Item>;
      }
    });
  };

  return (
    <MasterLayout>
      <Menu
        className="mt-5 pt-5"
        style={{ width: 256 }}
        mode="vertical"
        defaultSelectedKeys={["profile"]}
      >
        {renderMenuItems()}
      </Menu>
      {props.childern}
    </MasterLayout>
  );
};

export default SideNavigation;
