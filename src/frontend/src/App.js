import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Empty, Layout, Menu, Spin, Table, theme} from 'antd';
import {useState, useEffect} from "react";
import {getAllStudents} from "./client";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('King', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

//Table code
const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
];

const antIcon = <Spin />

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // Fetching students from the backend
    const [students,setStudents] = useState([]);
    const [fetching,setFetching] = useState(true);
    const fetchStudents = ()=>{
        return getAllStudents().then(res=>res.json()).then(data=>{
            setStudents(data)
            setFetching(false);
        });
    }
    useEffect(()=>{
        fetchStudents()
    },[]);

   const checkFetching = () => {
       if (fetching)
           return antIcon;
   }

   const checkStudentsCount = () => {
       if (students.length <= 0)
           return <Empty/>;
   }

    return (
        <Layout style={{minHeight: '100vh',}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)',}}/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header style={{padding: 0, background: colorBgContainer,}}/>
                <Content style={{margin: '0 16px',}}>
                    <Breadcrumb style={{margin: '16px 0',}}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>King</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{padding: 24, minHeight: 360, background: colorBgContainer,}}>
                        {/*Display students*/}
                        {checkFetching()}
                        {/*{checkStudentsCount()}*/}
                        <Table rowKey={(student)=>student.id} pagination={{ pageSize: 50 }} scroll={{ y: 240 }}
                            bordered
                            title={() => 'Student'} dataSource={students} columns={columns} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center',}}>
                    Soluspace ©2023 Created by King Wanyama
                </Footer>
            </Layout>
        </Layout>
    );
};
export default App;
