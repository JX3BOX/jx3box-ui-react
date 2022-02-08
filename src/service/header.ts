import axios from 'axios';
import { $helper, $cms } from '@jx3box/jx3box-common/js/https';
import { __dataPath } from '@jx3box/jx3box-common/data/jx3box.json';
import { CLIENT_TYPE_STD } from '@utils/constants';
import { isSTDClient } from '@utils/utils';

const makeBoxFileUrl = (file: string) => `data/box/${file}`;

export const getNav = (client = CLIENT_TYPE_STD) => {
  const filename = isSTDClient(client) ? 'header_nav_origin.json' : 'header_nav.json';
  return axios.get(__dataPath + makeBoxFileUrl(filename));
};

export const getBox = (client = CLIENT_TYPE_STD) => {
  const filename = isSTDClient(client) ? 'box_origin.json' : 'box.json';
  return axios.get(__dataPath + makeBoxFileUrl(filename));
};

export const getPanel = () => axios.get(__dataPath + makeBoxFileUrl('header_panel.json'));

export const getMsg = () => $helper({ mute: true }).get('/api/messages/unread_total');

export const getMenu = key => $cms().get(`/api/cms/config/menu/${key}`);
