// socket.on('cid-data', (data) => { ... });
/**
 * [2025. 07. 07.(월)]
 * - socket 'cid-data' 타입 정의
 */

const CID_DATA_TYPE = {
    DEVICE_INFO_REQ: 'device-info-req',
    DEVICE_INFO_RES: 'device-info-res',



    INCOMING: 'incoming',

    MASKED_PRIVATE: 'masked-private',
    MASKED_PUBLIC: 'masked-public',
    MASKED_UNAVAILABLE: 'masked-unavailable',


    DIAL_OUT: 'dial-out',
    DIAL_COMPLETE: 'dial-complete',
    FORCED_END: 'forced-end',



    OFF_HOOK: 'off-hook',
    ON_HOOK: 'on-hook',
};

export default CID_DATA_TYPE;