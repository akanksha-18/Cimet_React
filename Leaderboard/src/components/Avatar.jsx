import React, { useEffect, useState } from 'react';
import './Avatar.css'; // Import your CSS file

function Avatar() {
    const [avatars, setAvatars] = useState(JSON.parse(localStorage.getItem('avatars')) || []);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        localStorage.setItem('avatars', JSON.stringify(avatars));
    }, [avatars]);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const addAvatar = () => {
        if (name.trim()) {
            const color = getRandomColor();
            setAvatars([...avatars, { name, color }]);
            setName('');
            setModalVisible(false);
        }
    };

    const deleteAvatar = (nameToDelete) => {
        setAvatars(avatars.filter(avatar => avatar.name !== nameToDelete));
    };

    return (
        <div className="avatar-container">
            {avatars.map((avatar, index) => (
                <div className="avatar-wrapper" key={index}>
                    <div
                        className="avatar"
                        style={{ backgroundColor: avatar.color }}
                    >
                        {avatar.name[0].toUpperCase()}
                    </div>
                    <button className="delete-btn" onClick={() => deleteAvatar(avatar.name)}>
                        &times;
                    </button>
                </div>
            ))}
            <button className="add-btn" onClick={() => setModalVisible(true)}>+</button>

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field"
                        />
                        <button className="submit-btn" onClick={addAvatar}>Add User</button>
                        <button className="close-btn" onClick={() => setModalVisible(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Avatar;
