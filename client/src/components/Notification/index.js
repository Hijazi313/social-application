import {  notification } from 'antd';

const Notification = ({type, message=''}) => {
  notification.open({
    message: type,
    description: message 
  });
  return ""
};

export default Notification