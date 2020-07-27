'use strict';

import Cookies from 'js-cookie';

/**
 * 拿到 cookie domain
 * @returns {string}
 */
export function getCookieDomain(cookieDomainLevel) {
  let domain = document.domain;
  if (cookieDomainLevel > 0) {
    let arr = domain.split('.');
    let domainLen = arr.length - cookieDomainLevel;
    if (domainLen >= 2) {
      for (let i = 0; i < cookieDomainLevel; i++) {
        arr.shift();
      }
    }
    domain = arr.join('.');
  }
  return domain;
}

/**
 * @param value
 * @returns {*}
 */
export function prepareSet(value) {
  if (typeof value === 'object' || value instanceof Array) {
    value = JSON.stringify(value);
  }
  return value;
}

/**
 * @param value
 * @returns {*}
 */
export function prepareGet(value) {
  let jsonArr = ['{', '['];
  if (value !== undefined && jsonArr.indexOf(value[0]) > -1) {
    try {
      value = JSON.parse(value);
    } catch (e) {
      console.log('set error', e);
    }
  }
  return value;
}

/**
 * 设置 cookie
 * @param name
 * @param value
 * @param cookieSetting
 */
export function setCookie(name = 'default', value = '', cookieSetting = {}) {
  if (!value) return;

  let currentCookieSetting = {
    expires: 1,
  };
  if (cookieSetting['domain']) {
    cookieSetting['domain'] = getCookieDomain();
  }

  value = prepareSet(value);
  Object.assign(currentCookieSetting, cookieSetting);
  Cookies.set(`${name}`, value, currentCookieSetting);
}

/**
 * 拿到 cookie 值
 * @param name
 * @returns {*}
 */
export function getCookie(name = 'default') {
  return prepareGet(Cookies.get(`${name}`));
}

/**
 * 删除 cookie
 * @param {*} name
 * @param {*} cookieSetting
 */
export function removeCookie(name = 'default', cookieSetting = {}) {
  if (cookieSetting['domain']) {
    cookieSetting['domain'] = getCookieDomain();
  }
  return Cookies.remove(`${name}`, cookieSetting);
}

/**
 * 设置 session
 * @param name
 * @param value
 */
export function setSession(name = 'default', value = '') {
  return window.sessionStorage.setItem(`${name}`, prepareSet(value));
}

/**
 * 拿到 session 值
 * @param name
 * @returns {string | null}
 */
export function getSession(name = 'default') {
  return prepareGet(window.sessionStorage.getItem(`${name}`));
}

/**
 * 删除 session
 * @param name
 */
export function removeSession(name = 'default') {
  return window.sessionStorage.removeItem(`${name}`);
}

/**
 * 设置 local
 * @param name
 * @param value
 */
export function setLocal(name = 'default', value = '') {
  return window.localStorage.setItem(`${name}`, prepareSet(value));
}

/**
 * 拿到 local 值
 * @param name
 * @returns {string | null}
 */
export function getLocal(name = 'default') {
  return prepareGet(window.localStorage.getItem(`${name}`));
}

/**
 * 删除 local
 * @param name
 */
export function removeLocal(name = 'default') {
  return window.localStorage.removeItem(`${name}`);
}
