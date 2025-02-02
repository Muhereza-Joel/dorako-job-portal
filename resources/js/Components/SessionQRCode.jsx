import React from "react";
import { QRCodeSVG } from "qrcode.react";

const SessionQRCode = ({ session }) => {
    return (
        <div>
            <h1 className="text-gray-900 dark:text-gray-50">
                {session.location} - QR Code
            </h1>
            <p className="text-gray-900 dark:text-gray-50 mb-10">
                Scan this code to mark your attendance:
            </p>
            <QRCodeSVG value={session.qr_code} size={200} className="mb-20" />
        </div>
    );
};

export default SessionQRCode;
