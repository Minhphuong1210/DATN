import React from 'react';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface ShippingFormProps {
    shippingInfo: {
        fullName: string;
        address: string;
        city: string;
        tel: string;
        note: string;
        shippingMethod: string;
    };

    handleShippingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleShippingMethodChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({
    shippingInfo,

    handleShippingChange,
}) => {
    return (
        <div>
            <TextField
                label="Họ và tên"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleShippingChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Địa chỉ"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Thành phố"
                name="city"
                value={shippingInfo.city}
                onChange={handleShippingChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Số điện thoại"
                name="tel"
                value={shippingInfo.tel}
                onChange={handleShippingChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Ghi chú"
                multiline
                rows={4}
                name="note"
                variant="outlined"
                fullWidth
                value={shippingInfo.note}
                onChange={handleShippingChange}
            />

            <FormControl component="fieldset" style={{ marginTop: '20px' }}>
                <FormLabel component="legend">Phương thức vận chuyển</FormLabel>
                <RadioGroup
                    aria-label="shipping-method"
                    name="shippingMethod"
                    value={shippingInfo.shippingMethod}
                    onChange={handleShippingChange}
                >
                    <FormControlLabel value="standard" control={<Radio />} label="Vận chuyển tiêu chuẩn (3-5 ngày)" />
                    <FormControlLabel value="express" control={<Radio />} label="Vận chuyển nhanh (1-2 ngày)" />
                    <FormControlLabel value="overnight" control={<Radio />} label="Giao hàng qua đêm" />
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default ShippingForm;
