import React from "react";
import {Button, Space} from "antd";
import './App.css';

function App() {
  return (
    <div className="App">
        <Space direction="vertical">
            <Space wrap>
                <Button type='primary'>Hello</Button>
                <Button type="primary" loading>
                    Loading
                </Button>
            </Space>
        </Space>
    </div>
  );
}

export default App;
