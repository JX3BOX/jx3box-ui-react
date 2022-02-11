import axios from 'axios';
import { __helperUrl } from '@jx3box/jx3box-common/data/jx3box.json';

export const getBreadcrumb = (name: string) => axios.get(__helperUrl + `api/breadcrumb/${name}`);
