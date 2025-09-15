import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button,
    Avatar
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

const employees = [
    { id: 1, name: '김시아', team: '개발1팀', department: '기술연구소', position: '대리', email: 'sia.kim@example.com', phone: '010-1234-5678', hireDate: '2023-01-01' },
    { id: 2, name: '이철수', team: '인사팀', department: '경영지원본부', position: '과장', email: 'cslee@example.com', phone: '010-9876-5432', hireDate: '2022-05-15' },
    { id: 3, name: '박민지', team: '총무팀', department: '경영지원본부', position: '사원', email: 'mjpark@example.com', phone: '010-1111-2222', hireDate: '2024-03-20' },
    { id: 4, name: '최현우', team: '개발1팀', department: '기술연구소', position: '팀장', email: 'hwchoi@example.com', phone: '010-3333-4444', hireDate: '2019-10-10' },
    { id: 5, name: '유진아', team: '개발2팀', department: '기술연구소', position: '대리', email: 'jayoo@example.com', phone: '010-5555-6666', hireDate: '2021-08-05' },
    { id: 6, name: '강민혁', team: '개발2팀', department: '기술연구소', position: '사원', email: 'mhgang@example.com', phone: '010-7777-8888', hireDate: '2024-01-12' },
    { id: 7, name: '정우성', team: '인사팀', department: '경영지원본부', position: '부장', email: 'wsjeong@example.com', phone: '010-9999-0000', hireDate: '2018-02-28' },
];

const buildOrgData = (employees) => {
    const org = { id: 'root', name: '(주)이세계 아카이브', children: [] };
    const departments = {};

    employees.forEach(emp => {
        if (!departments[emp.department]) {
            departments[emp.department] = {
                id: emp.department,
                name: emp.department,
                children: []
            };
            org.children.push(departments[emp.department]);
        }
        let team = departments[emp.department].children.find(t => t.name === emp.team);
        if (!team) {
            team = { id: emp.team, name: emp.team, children: [] };
            departments[emp.department].children.push(team);
        }
        team.children.push({ id: emp.id, name: `${emp.name} (${emp.position})`, employee: emp });
    });
    return org;
};

const orgData = buildOrgData(employees);


const empColumns = [
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'team', headerName: '소속 팀', width: 150 },
    { field: 'department', headerName: '소속 본부', width: 200 },
    { field: 'position', headerName: '직급', width: 150 },
    { field: 'email', headerName: '이메일', flex: 1 },
];
const empRows = employees;


const TreeNode = ({ node, depth = 0, onEmployeeClick }) => {
    const [open, setOpen] = useState(true);
    const hasChildren = node.children && node.children.length > 0;
    const isEmployee = node.employee !== undefined;

    const handleClick = () => {
        if (isEmployee) {
            onEmployeeClick(node.employee);
        } else {
            setOpen(!open);
        }
    };

    return (
        <>
            <ListItemButton onClick={handleClick} sx={{ pl: 2 + (depth * 2) }}>
                <ListItemText primary={node.name} />
                {hasChildren ? (open ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItemButton>
            {hasChildren && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {node.children.map((childNode) => (
                            <TreeNode key={childNode.id} node={childNode} depth={depth + 1} onEmployeeClick={onEmployeeClick} />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};

const EmployeeDetailModal = ({ open, onClose, employee }) => {
    if (!employee) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{employee.name} 정보</Typography>
                <IconButton onClick={onClose} sx={{ color: theme => theme.palette.grey[500] }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                    <Avatar sx={{ width: 80, height: 80, mb: 2 }} />
                    <Typography variant="h5">{employee.name}</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>{employee.position}</Typography>
                    <Typography variant="body2" color="text.secondary">{employee.team} / {employee.department}</Typography>
                </Box>
                <Divider />
                <List>
                    <ListItemText primary="이메일" secondary={employee.email} />
                    <ListItemText primary="연락처" secondary={employee.phone} />
                    <ListItemText primary="입사일" secondary={employee.hireDate} />
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>닫기</Button>
            </DialogActions>
        </Dialog>
    );
};


const HrPage = () => {
    const [selectedMenu, setSelectedMenu] = useState('orgChart');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4 }}>인사/조직</Typography>

            <Paper sx={{ display: 'flex', height: '75vh' }}>

                <Box sx={{ width: 240, borderRight: '1px solid #e0e0e0', flexShrink: 0 }}>
                    <List component="nav">
                        <ListItemButton
                            selected={selectedMenu === 'orgChart'}
                            onClick={() => setSelectedMenu('orgChart')}
                        >
                            <ListItemText primary="조직도" />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton
                            selected={selectedMenu === 'employeeList'}
                            onClick={() => setSelectedMenu('employeeList')}
                        >
                            <ListItemText primary="임직원 목록" />
                        </ListItemButton>
                    </List>
                </Box>

                <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
                    {selectedMenu === 'orgChart' && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>조직도</Typography>
                            <List><TreeNode node={orgData} onEmployeeClick={handleEmployeeClick} /></List>
                        </Box>
                    )}
                    {selectedMenu === 'employeeList' && (
                        <Box sx={{ height: '100%', width: '100%' }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>임직원 목록</Typography>
                            <DataGrid
                                rows={empRows}
                                columns={empColumns}
                                onRowClick={(params) => handleEmployeeClick(params.row)}
                            />
                        </Box>
                    )}
                </Box>
            </Paper>
            <EmployeeDetailModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                employee={selectedEmployee}
            />
        </Box>
    );
};

export default HrPage;