import React, { useState } from 'react';

const Converter: React.FC = () => {
    const [base64String, setBase64String] = useState<string>('');

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                setBase64String(base64);
            };
            reader.readAsDataURL(file);
        }
    };



    return (
        <div>
            <input type="file" accept=".jpg,.png,.pdf" onChange={handleFileInputChange} />
            {base64String && (
                <div>
                    <h2>Сжатая Base64 строка:</h2>
                    <textarea rows={10} cols={50} value={base64String} readOnly />
                </div>
            )}
        </div>
    );
};

export default Converter;
