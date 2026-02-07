"use strict";
async function sendVerifyCode(phone) {
  return Promise.resolve(true);
}
async function verifyCode(phone, code) {
  return Promise.resolve(true);
}
exports.sendVerifyCode = sendVerifyCode;
exports.verifyCode = verifyCode;
