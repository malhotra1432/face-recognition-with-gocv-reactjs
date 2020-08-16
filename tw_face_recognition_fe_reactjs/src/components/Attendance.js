import React from 'react';
import {Table} from 'antd';

function Attendance() {

    const columns = [
        {
            title: 'TWerName',
            dataIndex: 'twername',
            width: 150,
        },
        {
            title: 'TWerID',
            dataIndex: 'twerid',
            width: 150,
        },
        {
            title: 'Attendance Status',
            dataIndex: 'attendancestatus',
            width: 150,
        }
    ];

    const data = [{
        twername: `Edward King`,
        twerid: 32,
        attendancestatus: "true"
    }];

    return (
        <div className="AttendanceApp">
            <Table columns={columns} dataSource={data} pagination={{pageSize: 50}} scroll={{y: 240}}/>
        </div>
    );
}

export default Attendance;