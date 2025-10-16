
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const accounts = [
    { username: 'conbocuoi', password: 'troconbo', email: 'conbocuoi@gmail.com'},
    { username: 'Skibidi', password: 'skibidi123', email: 'skibidi123@gmail.com'},
    { username: 'huysvpbvm', password:'huycan', email: 'huypbvm611@gmail.com'},
    { username: 'myhoaky', password: 'danchukeodong', email: 'danchu456@gmail.com'}
];
function FindAccount() {
    const [username, setUsername] = useState('');
    const [foundAccount, setFoundAccount] = useState(null);
    const [error, setError] = useState(''); 
    const handleChange = (e) => {
        setUsername(e.target.value);
        setError('');
    };
    const handleSearch = () => {
        const account = accounts.find(acc => acc.username === username);
        if (account) {
            setFoundAccount(account);
            setError('');
        } else {
            setFoundAccount(null);
            setError('Không tìm thấy tài khoản với tên người dùng đã nhập.');
        }
    };
    const handleReset = () => {
        setUsername('');
        setFoundAccount(null);
        setError('');
    };  
    return (
        <div style={{ maxWidth: 400, margin: '40px auto', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', background: '#f7fafd' }}>
            <h3 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>Tìm kiếm tài khoản</h3>
            <input      
                type="text"
                value={username}
                onChange={handleChange}
                placeholder="Nhập tên người dùng..."
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #90caf9', marginBottom: 18, fontSize: 16, outline: 'none', boxSizing: 'border-box' }}
            />
            <Button onClick={handleSearch} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1976d2', color: 'white', fontSize: 16, border: 'none', cursor: 'pointer' }}>
                Tìm kiếm
            </Button>
            {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
            {foundAccount && (
                <div style={{ marginTop: 20, padding: '15px', border: '1px solid #90caf9', borderRadius: '8px', background: '#e3f2fd' }}>
                    <h4>Thông tin tài khoản:</h4>
                    <p><strong>Tên người dùng:</strong> {foundAccount.username}</p>
                    <p><strong>Mật khẩu:</strong>{foundAccount.password}</p>
                    <p><strong>Email:</strong> {foundAccount.email}</p>
                    <Button onClick={handleReset} style={{ marginTop: 10, padding: '8px 16px', borderRadius: '6px', background: '#1976d2', color: 'white', fontSize: 14, border: 'none', cursor: 'pointer' }}>
                        Đóng    
                    </Button>
                </div>
            )}
        </div>
    );
}
export default FindAccount;