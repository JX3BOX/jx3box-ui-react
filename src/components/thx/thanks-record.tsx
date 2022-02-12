import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Spin, Pagination, Modal, notification } from 'antd';
import { LoadingOutlined, TrophyOutlined } from '@ant-design/icons';
import { showTime } from '@jx3box/jx3box-common/js/moment';
import { Jx3BoxContext } from '@components/provider';
import { showAvatar, authorLink } from '@jx3box/jx3box-common/js/utils';
import { getPostBoxcoinRecords, recoveryBoxcoin } from '@service/thanks';
import { ThanksRecordItem } from '@utils/types';
import Gift from '../../assets/widget/gift.svg';
import GiftAdmin from '../../assets/widget/admin_gift.svg';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export interface ThanksRecordProps {
  postType: string | number;
  postId: string | number;
}

const ThanksRecord: React.FC<ThanksRecordProps> = props => {
  const { isSuperAdmin } = useContext(Jx3BoxContext);
  const { postId, postType } = props;
  const [loading, setLoading] = useState(true);
  const [recordList, setRecordList] = useState([] as ThanksRecordItem[]);
  const [recordListTotal, setRecordListTotal] = useState(0);
  const [pageField, setPageField] = useState({ pageSize: 12, pageIndex: 1 });

  /**
   * 请求打赏列表
   * 在分页改变的时候再次请求
   *
   * @method useEffect
   * @method getPostBoxcoinRecords
   */
  useEffect(() => {
    getPostBoxcoinRecords(postType, postId, pageField).then(result => {
      setLoading(false);
      setRecordList(result.data.data.list);
      setRecordListTotal(result.data.data.page.total);
    });
  }, [postType, postId, pageField]);

  /**
   * 翻页
   * @param onChangePageField
   */
  const onChangePageField = useCallback(
    (page, pageSize) => setPageField({ pageIndex: page, pageSize }),
    []
  );

  /**
   * 撤销打赏
   *
   * how to splice array in useState
   * https://www.codegrepper.com/code-examples/javascript/usestate+array+splice
   *
   * @method onRecoveryHandle
   */
  const onRecoveryHandle = useCallback(
    item => {
      Modal.confirm({
        title: '是否确定撤销该评分？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          recoveryBoxcoin(item.id).then(() => {
            notification.success({ message: '撤销成功' });
            setRecordList(
              recordList.filter(prevRecordListItem => prevRecordListItem.id !== item.id)
            );
          });
        },
      });
    },
    [recordList]
  );

  return (
    <Spin indicator={antIcon} spinning={loading}>
      <div className='w-boxcoin-records'>
        {recordList.length > 0 && (
          <div className='w-boxcoin-records-list'>
            <ul className='u-list'>
              <li className='u-item u-head'>
                <span className='u-meta u-action u-action-small'>
                  <TrophyOutlined />
                </span>
                <span className='u-meta u-user'>参与打赏</span>
                <span className='u-meta u-count'>盒币</span>
                <span className='u-meta u-remark'>寄语</span>
                <time className='u-meta u-time'></time>
              </li>

              {recordList.map((item, index) => (
                <li key={index} className='u-item u-body'>
                  <span className='u-meta u-action'>
                    {item.is_user_gift ? (
                      <i title='打赏'>
                        <Gift />
                      </i>
                    ) : (
                      <i title='品鉴'>
                        <GiftAdmin />
                      </i>
                    )}
                  </span>

                  <a
                    className='u-meta u-user'
                    href={authorLink(item.operate_user_id)}
                    rel='noreferrer'
                    target='_blank'
                  >
                    <img
                      className='u-user-avatar'
                      src={showAvatar(item.ext_operate_user_info.avatar)}
                      alt=''
                    />
                    <span>{item.ext_operate_user_info.display_name}</span>
                  </a>

                  <span className='u-meta u-count'>
                    +<b>{item.count}</b>
                  </span>

                  <span className='u-meta u-remark'>{item.remark}</span>
                  <time className='u-meta u-time'>{showTime(item.created_at)}</time>
                  {isSuperAdmin && !item.is_user_gift && (
                    <span className='u-delete' onClick={() => onRecoveryHandle(item)}>
                      <i className='el-icon-delete'></i>撤销
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Pagination
        className='w-boxcoin-records-pages'
        hideOnSinglePage={true}
        total={recordListTotal}
        current={pageField.pageIndex}
        pageSize={pageField.pageSize}
        onChange={onChangePageField}
      />
    </Spin>
  );
};

export default ThanksRecord;
