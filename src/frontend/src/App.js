import {DesktopOutlined, DownloadOutlined, FileOutlined, PieChartOutlined,
    TeamOutlined, UserAddOutlined, UserOutlined} from '@ant-design/icons';
import {Badge, Breadcrumb, Button, Empty, Layout, Menu, Popconfirm, Radio, Spin, Table, Tag, theme} from 'antd';
import "./App.css"
import {useState, useEffect} from "react";
import {getAllStudents,deleteStudent} from "./client";
import StudentDrawerForm from "./StudentDrawerForm";
import Avatar from "antd/es/avatar/avatar";
import {errorNotification, successNotification} from "./Notification";

const { Header, Content, Footer, Sider } = Layout;
const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (trim.length === 0) {
        return <Avatar icon={<UserOutlined/>}/>
    }
    const split = trim.split(" ");
    if (split.length === 1) {
        return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>
        {`${name.charAt(0)}${name.charAt(name.length - 1)}`}
    </Avatar>
}
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
const removeStudent = (studentId, callback) => {
    deleteStudent(studentId).then(() => {
        successNotification("Student deleted", `Student with ${studentId} was deleted`);
        callback();
    }).catch(err => {
        err.response.json().then(res => {
            console.log(res);
            errorNotification(
                `There was an ${res.error}`,
                `${res.message}`
            )
        });
    })
}

//Table code
const columns = fetchStudents=>[
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) =>
            <TheAvatar name={student.name}/>
    },

    // {
    //     title: 'Id',
    //     dataIndex: 'id',
    //     key: 'id',
    // },

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
    {
        title: 'Actions',
        key: 'actions',
        render:(text, student)=>
            <Radio.Group>
                <Popconfirm
                    placement='topRight'
                    title={`Are you sure to delete ${student.name}`}
                    onConfirm={() => removeStudent(student.id, fetchStudents)}
                    okText='Yes'
                    cancelText='No'>
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>
                <Radio.Button onClick={() => alert("TODO: Implement edit student")} value="small">Edit</Radio.Button>
            </Radio.Group>
    },

];

const antIcon = <Spin />

const App = () => {
    const [fetching,setFetching] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const [students,setStudents] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const fetchStudents = ()=>{
        return getAllStudents().then(res=>res.json()).then(data=>{
            setStudents(data)
        }).catch(err=>{
            console.log(err.response);
            err.response.json().then(res=>{
                console.log(res);
                errorNotification(`There was ${res.error}`,res.message)
            });
        }).finally(()=>setFetching(false));
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
                        <StudentDrawerForm setShowDrawer={setShowDrawer} showDrawer={showDrawer} fetchStudents={fetchStudents}/>
                        <Table rowKey={(student)=>student.id} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} bordered
                               title={() =>
                                   <>
                                       <Button onClick={()=>setShowDrawer(!showDrawer)}
                                               type="primary" shape="round"
                                               icon={<UserAddOutlined />} size={'middle'}>
                                           Add New Student
                                       </Button>
                                       <br/>
                                       <br/>
                                       <Tag className="site-tag-students-count">Students count</Tag>
                                       <Badge count={students.length} showZero color="#b4b0b0" />
                                   </>
                               } dataSource={students} columns={columns(fetchStudents)} />
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
