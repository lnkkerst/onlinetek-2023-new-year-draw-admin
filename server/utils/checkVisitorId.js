const cvt = s => {
  const CRC = {};

  CRC.CRC16 = function (data) {
    const len = data.length;
    if (len > 0) {
      let crc = 0xffff;

      for (let i = 0; i < len; i++) {
        crc = crc ^ data[i];
        for (let j = 0; j < 8; j++) {
          crc = (crc & 1) !== 0 ? (crc >> 1) ^ 0xa001 : crc >> 1;
        }
      }
      const hi = (crc & 0xff00) >> 8; // 高位置
      const lo = crc & 0x00ff; // 低位置

      return [hi, lo];
    }
    return [0, 0];
  };

  CRC.isArray = function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };

  CRC.ToCRC16 = function (str, isReverse) {
    return CRC.toString(
      CRC.CRC16(CRC.isArray(str) ? str : CRC.strToByte(str)),
      isReverse
    );
  };

  CRC.padLeft = function (s, w, pc) {
    if (pc === undefined) {
      pc = '0';
    }
    for (let i = 0, c = w - s.length; i < c; i++) {
      s = pc + s;
    }
    return s;
  };

  CRC.toString = function (arr, isReverse) {
    if (typeof isReverse == 'undefined') {
      isReverse = true;
    }
    const hi = arr[0];
    const lo = arr[1];
    return CRC.padLeft(
      (isReverse ? hi + lo * 0x100 : hi * 0x100 + lo)
        .toString(16)
        .toUpperCase(),
      4,
      '0'
    );
  };

  CRC.strToByte = function (str) {
    const tmp = str.split('');
    const arr = [];
    for (let i = 0, c = tmp.length; i < c; i++) {
      const j = encodeURI(tmp[i]);
      if (j.length === 1) {
        arr.push(j.charCodeAt());
      } else {
        const b = j.split('%');
        for (let m = 1; m < b.length; m++) {
          arr.push(parseInt(`0x${b[m]}`));
        }
      }
    }
    return arr;
  };

  return CRC.ToCRC16(CRC.ToCRC16(`${s}0nlineTek`, true), false);
};

export const checkVisitorId = s => {
  if (typeof s !== 'string') {
    return;
  }

  if (s.length <= 4) {
    return false;
  }

  const payload = s.slice(0, s.length - 4);
  const crc = s.slice(s.length - 4);

  return crc === cvt(payload);
};
