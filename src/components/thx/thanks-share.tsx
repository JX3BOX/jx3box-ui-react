import React from 'react';

export interface ThanksShareProps {
  postType: string | number;
  postId: string | number;
}

const ThanksShare: React.FC<ThanksShareProps> = () => {
  return <div className='w-share2'> </div>;
};

export default ThanksShare;
